const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Validator = require('validator');
const isEmpty = require('is-empty');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
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
        const takenEmail = await User.findOne({ email: user.email });
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

//********** Input validation functions **********

function validateRegisterInput(data) {
    let errors = {};

    //converting empty fields to strings
    data.fname = !isEmpty(data.fname) ? data.fname : '';
    data.lname = !isEmpty(data.lname) ? data.lname : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';
    
    //field checks (empty input / password rules / etc..)
    //Name Checks
    if (Validator.isEmpty(data.fname)) {
        errors.fname = 'First name field is required';
    } 
    if (Validator.isEmpty(data.lname)) {
        errors.lname = 'Last name field is required';
    }
    //Gender Check
    if (Validator.isEmpty(data.gender)) {
        errors.gender = 'Gender field is required';
    } else if (!(Validator.equals(data.gender,'male') || Validator.equals(data.gender,'female'))) {
        errors.gender = 'Wrong input in gender field'
    }
    //Email Check
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    //Username Check
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }
    //Password check
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    } else if (!Validator.isLength(data.password, { min: 8, max: 64 })) {
        errors.password = `Password must be at least 8 characters long${data.password.length > 64 ? ' and less than 64': ''}`;
    } else if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Confirm Password field is required';
    } else if (!Validator.equals(data.password,data.confirmPassword)) {
        errors.confirmPassword = 'Passwords must match';
    }
    return { errors, isValid: isEmpty(errors) };
    
}

function validateLoginInput(data) {
    const errors = {};
    //converting empty fields to strings
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    return { errors, isValid: isEmpty(errors) };
}


//*************** Email transfer function ******************

function sendEmail(email, uniqueString) {
    var Transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'loom.senior@gmail.com',
            pass: process.env.LOOM_EMAIL_PASSWORD
        }
    });

    let sender = 'Eirene';
    var mailOptions = {
        from: sender,
        to: email,
        subject: 'Eirene account verification',
        html: `hi kifak, press <a href=http://localhost:${process.env.PORT}/account/verify/${uniqueString}>here</a> to verify your account!`
    };

    Transport.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent')
        }
    });


}

module.exports = {
    register,
    login,
    verifyEmail
};