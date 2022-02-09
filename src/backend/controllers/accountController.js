const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto');
const sendEmail = require('../helperFunctions/emailSender');
const { validateLoginInput, validateRegisterInput, validatePassResetInput } = require('../helperFunctions/inputValidation');
dotenv.config();

// Expected Request : Receive a JSON, filled with user data
const register = async (req, res) => {
    const user = req.body;
    const { errors, isValid } = validateRegisterInput(user);
    if (!isValid) {
        res.status(400).json(errors);
    } 
    else {
        //check if user's email/username are already taken
        const takenUsername = await User.findOne({ username: user.username.toLowerCase() });
        const takenEmail = await User.findOne({ email: user.email.toLowerCase() });
        if (takenUsername) {
            res.status(400).json({ message: 'Username is already in use' });
        } else if (takenEmail) {
            res.status(400).json({ message: 'Email is already in use' });
        }
        else {
            //hash the password before storing in DB (salt should be auto-generated)
            user.password = await bcrypt.hash(req.body.password, 10);
            const randString = crypto.randomBytes(20).toString('hex');
    
            const dbUser = new User({
                fname: user.fname,
                lname: user.lname,
                gender: user.gender,
                username: user.username.toLowerCase(),
                email: user.email.toLowerCase(),
                password: user.password ,
                uniqueString: randString
            });
    
            dbUser.save()
                .then(() => {
                    sendEmail(dbUser.email, dbUser.uniqueString);
                    res.status(201).json({ message: 'Successfully created user account' });
                })
                .catch((err) => {
                    console.log(`Error occurred while storing user account in database : ${err}`);
                })
        }
    }
    
    
}

//Expected Request : Receive login credentials (username and password)
const login = (req, res) => {
    const userLoggingIn = req.body;

    const { errors, isValid } = validateLoginInput(userLoggingIn);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    //find the received username in database
    User.findOne({ username: userLoggingIn.username.toLowerCase() })
        .then((dbUser) => {
            if (!dbUser) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password) //verify password
                .then((validPassword) => {
                    if (validPassword) { //valid password, sends an authentication token
                        // Don't put sensitive data here, only data you want the client to have such as name (to view in profile page)
                        const payload = { id: dbUser._id, username: dbUser.username }
                        //sign a jsonwebtoken with user's data as payload, a secret key, token expires in 1 day
                        jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: 86400 }, (err, token) => {
                                if (err) {
                                    return res.status(500).json({ message: `Error during token creation : ${err}` });
                                } 
                                else {
                                    return res.status(200).json({ message: 'Successful Authentication', token: 'Bearer '+token });
                                }
                            }
                        );
                    }
                    else {
                        res.status(401).json({ message: 'Wrong password' });
                    }
                })
        })
}

const verifyEmail = async (req, res) => {
    const { uniqueString } = req.params;

    const validUser = await User.findOne({ uniqueString });

    if (validUser) {
        validUser.verified = true;
        await validUser.save()
        res.status(200).json({ message: 'Account verified!' })
    }
    else {
        res.status(401).json({ message: 'User not found' });
    }
};

//Expected data are the old password, a new one with a confirmation field
const resetPassword = async (req, res) => {
    //Validating New Passwords
    const resetInfo = req.body;

    const { errors, isValid } = validatePassResetInput(resetInfo);

    if (!isValid) {
        res.status(400).json(errors);
    } 
    else {
        //Find user in database
        const currentUserFound = await User.findOne({ username: req.user.username.toLowerCase() });
        if (currentUserFound) {
            //verifying old password
            bcrypt.compare(resetInfo.oldPassword, currentUserFound.password)
                .then((validPassword) => {
                    if (validPassword) {
                        bcrypt.hash(resetInfo.newPassword, 10)
                            .then((hashedPassword) => {
                                currentUserFound.password = hashedPassword;
                                currentUserFound.save()
                                    .then(() => {
                                        res.status(201).json({ message: 'Password reset successful.' })
                                    })
                                    .catch((err) => {
                                        console.log(`Error occurred during updating user's password in DB : ${err}`)
                                    })
                            })
                            .catch((err) => {
                                console.log(`Error occurred while hashing user's new password : ${err}`);
                            })
                    }
                    else {
                        res.status(401).json({ message: 'Old password is incorrect' });
                    }
                })
                .catch((err) => {
                    console.log(`Error occurred while verifying user's password : ${err}`);
                })

        }
        else {
            res.status(404).json({ message: 'Account not found' })
        }
    }

};

module.exports = {
    register,
    login,
    verifyEmail,
    resetPassword
};