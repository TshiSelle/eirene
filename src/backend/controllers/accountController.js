const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Expected Request : Receive a JSON, filled with user data
const register = async (req, res) => {
    const user = req.body;

    //check if user's email/username are already taken
    const takenUsername = await User.findOne({ username: user.username.toLowerCase() });
    const takenEmail = await User.findOne({ email: user.email });

    if (takenUsername) {
        res.status(400).json({ message: 'Username is already in use' });
    }
    else if (takenEmail) {
        res.status(400).json({ message: 'Email is already in use' });
    }
    else {
        //hash the password before storing in DB (salt should be auto-generated)
        user.password = await bcrypt.hash(req.body.password, 10);

        const dbUser = new User({
            fname: user.fname,
            lname: user.lname,
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password 
        });

        dbUser.save()
            .then(() => {
                res.status(201).json({ message: 'Succesfully created user account' });
            })
            .catch((err) => {
                console.log(`Error occurred while storing user account in database : ${err}`);
            })
    }
}

//Expected Request : Receive login credentials (username and password)
const login = (req, res) => {
    const userLoggingIn = req.body;

    //find the received username in database
    User.findOne({ username: userLoggingIn.username.toLowerCase() })
        .then((dbUser) => {
            if (!dbUser) {
                return res.status(401).json({ messsage: 'Invalid username or password' });
            }
            bcrypt.compare(userLoggingIn.password,dbUser.password) //verify password
                .then((validPassword) => {
                    if (validPassword) { //valid password, sends an authentication token
                        // Don't put sensitive data here, only data you want the client to have such as name (to view in profile page)
                        const payload = {
                            id: dbUser._id,
                            username: dbUser.username
                        }
                        //sign a jsonwebtoken with user's data as payload, a secret key, token expires in 1 day
                        jwt.sign(
                            payload, 
                            process.env.JWT_SECRET, 
                            { expiresIn: 86400 }, 
                            (err, token) => {
                                if (err) {
                                    return res.status(500).json({ message: `Error during token creation : ${err}` });
                                } 
                                else {
                                    return res.status(200).json({
                                        message: 'Succesful Authentication',
                                        token: 'Bearer '+token
                                    });
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

module.exports = {
    register,
    login
};