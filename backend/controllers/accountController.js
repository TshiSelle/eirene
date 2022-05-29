const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Validator = require('validator');
const crypto = require('crypto');
const isEmpty = require('is-empty');

const { User } = require('../models/user');
const { sendEmailVerification, sendEmailResetPass, sendDeactivationEmail } = require('../helperFunctions/emailSender');
const {
	validateLoginInput,
	validateRegisterInput,
	validatePassChangeInput,
	validateEmail,
	validatePassResetInput,
} = require('../helperFunctions/inputValidation');

dotenv.config();

// Expected Request : Receive a JSON, filled with user data
const register = async (req, res) => {
	const user = req.body;
	const { errors, isValid } = validateRegisterInput(user);
	if (!isValid) {
		res.status(400).json({ ...errors, success: false });
	} else {
		//check if user's email/username are already taken
		const takenUsername = await User.findOne({ username: user.username.toLowerCase() });
		const takenEmail = await User.findOne({ email: user.email.toLowerCase() });
		if (takenUsername) {
			res.status(400).json({ message: 'Username is already in use', success: false });
		} else if (takenEmail) {
			res.status(400).json({ message: 'Email is already in use', success: false });
		} else {
			//hash the password before storing in DB (salt should be auto-generated)
			user.password = await bcrypt.hash(req.body.password, 10);
			const randString = crypto.randomBytes(20).toString('hex');

			const dbUser = new User({
				fname: Validator.trim(user.fname),
				lname: Validator.trim(user.lname),
				gender: Validator.trim(user.gender),
				username: Validator.trim(user.username.toLowerCase()),
				email: user.email.toLowerCase(),
				password: user.password,
				emailVerificationToken: randString,
			});

			dbUser
				.save()
				.then(() => {
					sendEmailVerification(dbUser.username, dbUser.email, dbUser.emailVerificationToken);
					const payload = { id: dbUser._id, username: dbUser.username };
					//sign a jsonwebtoken with user's data as payload, a secret key, token expires in 1 day
					jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 86400 }, (err, token) => {
						if (err) {
							return res
								.status(500)
								.json({ message: `Error during token creation : ${err}`, success: false });
						} else {
							return res.status(201).json({
								message: 'Successfully created user account',
								token: 'Bearer ' + token,
								success: true,
							});
						}
					});
				})
				.catch((err) => {
					res.status(400).json({ message: `Failed: ${err}`, success: false });
					console.log(`Error occurred while storing user account in database : ${err}`);
				});
		}
	}
};

//Expected Request : Receive login credentials (username and password)
const login = (req, res) => {
	const userLoggingIn = req.body;

	const { errors, isValid } = validateLoginInput(userLoggingIn);

	if (!isValid) {
		return res.status(400).json({ ...errors, success: false });
	}

	//find the received username in database
	User.findOne({ username: userLoggingIn.username.toLowerCase() }).then((dbUser) => {
		if (!dbUser) {
			return res.status(401).json({ message: 'Invalid username or password', success: false });
		}
		bcrypt
			.compare(userLoggingIn.password, dbUser.password) //verify password
			.then((validPassword) => {
				if (validPassword) {
					//valid password, sends an authentication token
					// Don't put sensitive data here, only data you want the client to have such as name (to view in profile page)
					const payload = { id: dbUser._id, username: dbUser.username };
					//sign a jsonwebtoken with user's data as payload, a secret key, token expires in 1 day
					jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 86400 }, (err, token) => {
						if (err) {
							return res
								.status(500)
								.json({ message: `Error during token creation : ${err}`, success: false });
						} else {
							return res.status(200).json({
								message: 'Successful Authentication',
								token: 'Bearer ' + token,
								success: true,
							});
						}
					});
				} else {
					res.status(401).json({ message: 'Wrong password', success: false });
				}
			});
	});
};

const verifyEmail = async (req, res) => {
	const { username, emailVerificationToken } = req.params;

	if (isEmpty(emailVerificationToken)) {
		return res.status(400).json({ message: 'No token found', success: false });
	}

	const validUser = await User.findOne({ username, emailVerificationToken });

	if (validUser) {
		validUser.verified = true;
		validUser.emailVerificationToken = undefined;
		validUser
			.save()
			.then((dbUser) => {
				res.status(200).json({ message: `${dbUser.username}'s account verified!`, success: true });
			})
			.catch((err) => {
				res.status(400).json({ error: err.name + ': ' + err.message, success: false });
			});
	} else {
		res.status(401).json({ message: 'Invalid Link!', success: false });
	}
};

//Expected data are the old password, a new one with a confirmation field
const changePassword = async (req, res) => {
	//Validating New Passwords
	const changeInfo = req.body;

	const { errors, isValid } = validatePassChangeInput(changeInfo);

	if (!isValid) {
		res.status(400).json({ ...errors, success: false });
	} else {
		//Find user in database
		const currentUserFound = await User.findOne({ username: req.user.username.toLowerCase() });
		if (currentUserFound) {
			//verifying old password
			bcrypt
				.compare(changeInfo.oldPassword, currentUserFound.password)
				.then((validPassword) => {
					if (validPassword) {
						if (Validator.equals(changeInfo.oldPassword, changeInfo.newPassword)) {
							return res
								.status(400)
								.json({ message: 'Old and new password cannot be the same', success: false });
						}

						bcrypt
							.hash(changeInfo.newPassword, 10)
							.then((hashedPassword) => {
								currentUserFound.password = hashedPassword;
								currentUserFound
									.save()
									.then(() => {
										res.status(201).json({ message: 'Password change successful.', success: true });
									})
									.catch((err) => {
										console.log(`Error occurred during updating user's password in DB : ${err}`);
									});
							})
							.catch((err) => {
								console.log(`Error occurred while hashing user's new password : ${err}`);
							});
					} else {
						res.status(401).json({ message: 'Old password is incorrect', success: false });
					}
				})
				.catch((err) => {
					console.log(`Error occurred while verifying user's password : ${err}`);
				});
		} else {
			res.status(404).json({ message: 'Account not found', success: false });
		}
	}
};

//Expected request:  an email(sent thru forgot password page)
const forgotPassword = async (req, res) => {
	const userInput = req.body;
	const { errors, isValid } = validateEmail(userInput);

	if (!isValid) {
		return res.status(400).json({ ...errors, success: false });
	}

	const user = await User.findOne({ email: userInput.email.toLowerCase() });

	if (user) {
		// user exists, check if user is verified
		if (user.verified) {
			//generate a new unique string and send to user's email
			const randString = crypto.randomBytes(20).toString('hex');
			user.passResetToken = randString;
			user.passResetTokenExpirationDate = Date.now() + 3600000;
			await user.save();

			sendEmailResetPass(user.email, user.username, randString);

			return res.status(200).json({ message: 'Reset Password email sent', success: true });
			//TODO: consider token authentication instead of unique string
		} else {
			res.status(400).json({
				message: 'Please verify your account before resetting your password',
				success: false,
			});
		}
	} else {
		//Email not found
		res.status(400).json({ message: 'Email is not registered', success: false });
	}
};

const resetPassPage = async (req, res) => {
	if (isEmpty(req.params.passResetToken)) {
		return res.status(400).json({ message: 'No token found', success: false });
	}
	const dbUser = await User.findOne({
		username: req.params.username,
		passResetToken: req.params.passResetToken,
		passResetTokenExpirationDate: { $gt: Date.now() },
	});
	if (dbUser) {
		//redirects the user to reset password webpage
		res.status(200).json({ tokenValid: true, message: 'User authenticated', success: true });
	} else {
		return res.status(401).json({ tokenValid: false, message: 'User not found or token expired', success: false });
	}
};

const resetPass = async (req, res) => {
	if (isEmpty(req.params.passResetToken)) {
		return res.status(400).json({ message: 'No token found', success: false });
	}

	//Validating New Passwords
	const resetInfo = req.body;
	const { errors, isValid } = validatePassResetInput(resetInfo);

	if (!isValid) {
		res.status(400).json({ ...errors, success: false });
	} else {
		const dbUser = await User.findOne({
			username: req.params.username,
			passResetToken: req.params.passResetToken,
			passResetTokenExpirationDate: { $gt: Date.now() },
		});
		if (dbUser) {
			if (!bcrypt.compareSync(resetInfo.newPassword, dbUser.password)){
				bcrypt
					.hash(resetInfo.newPassword, 10)
					.then((hashedPassword) => {
						dbUser.password = hashedPassword;
						dbUser.passResetToken = undefined;
						dbUser.passResetTokenExpirationDate = undefined;
						dbUser
							.save()
							.then(() => {
								res.status(201).json({ message: 'Password reset successful.', success: true });
							})
							.catch((err) => {
								console.log(`Error occurred during updating user's password in DB : ${err}`);
							});
					})
					.catch((err) => {
						console.log(`Error occurred while hashing user's new password : ${err}`);
					});
			} else {
				res.status(400).json({ message: "New password can't be same as old password." })
			}
		} else {
			return res.status(401).json({ message: 'User not found or token expired', success: false });
		}
	}
};

const deactivate = (req, res) => {
	User.findById(req.user.id)
		.then((dbUser) => {
			if (dbUser) {
				if (dbUser.deactivationDate) {
					res.status(400).json({ message: 'User account is already in deactivation', success: false });
				} else {
					dbUser.deactivationDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 10); //10 days (ms s m hr d)
					dbUser
						.save()
						.then(() => {
							sendDeactivationEmail(dbUser);
							res.status(202).json({ message: 'Deactivation process started', success: true });
						})
						.catch((err) => {
							res.status(500).json({
								message: `Error occurred while setting deactivation config : ${err}`,
								success: false,
							});
						});
				}
			}
		})
		.catch((err) => {
			res.status(500).json({ message: `Error occurred while searching for user : ${err}`, success: false });
		});
};

const undeactivate = (req, res) => {
	User.findById(req.user.id)
		.then((dbUser) => {
			if (dbUser.deactivationDate) {
				dbUser.deactivationDate = undefined;
				dbUser
					.save()
					.then(() => {
						res.status(201).json({ message: 'Deactivation process stopped', success: true });
					})
					.catch((err) => {
						res.status(500).json({
							message: `Error occurred while setting deactivation config : ${err}`,
							success: false,
						});
					});
			} else {
				res.status(400).json({ message: 'User account is not in deactivation process', succes: false });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: `Error occurred while searching for user : ${err}`, success: false });
		});
};

module.exports = {
	register,
	login,
	verifyEmail,
	changePassword,
	forgotPassword,
	resetPassPage,
	resetPass,
	deactivate,
	undeactivate,
};
