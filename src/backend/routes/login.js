const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { json } = require('body-parser');
const router = express.Router();


dotenv.config();
//Expected login credential as request (username and password)
router.post('/', (req, res) => {
    const userLogginIn = req.body;

    //find the received username in database
    User.findOne({ username: userLogginIn.username.toLowerCase() })
        .then((dbUser) => {
            if (!dbUser) {
                return res.status(401).json({ messsage: 'Invalid username or password' });
            }
            bcrypt.compare(userLogginIn.password,dbUser.password) //verify password
                .then((validPassword) => {
                    if (validPassword) { //valid password, sends an authentication token
                        const payload = {
                            id: dbUser._id,
                            username: dbUser.username
                        }
                        //sign a jsonwebtoken with users data as payload, a secretkey, token expires in 1 day
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
});

module.exports = router;