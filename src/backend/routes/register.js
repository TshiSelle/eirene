const express = require('express');
const { User } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');

//Expected: Receive a json object, filled with user data
router.post('/', async (req, res) => {
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
});


module.exports = router;