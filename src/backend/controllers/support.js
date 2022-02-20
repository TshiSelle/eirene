const isEmpty = require('is-empty');
const { User } = require('../models/user');
const { sendEmailSupport } = require('../helperFunctions/emailSender')
/* incoming data: supportMessage */

const contactUs = async (req, res) => {
    if (isEmpty(req.body.supportMessage)) {
        return res.status(422).json({ message: 'Your support message is empty', success: false }) 
    }
    res.status(200).json({ message: 'Support message sent!', success: true });
    const dbUser = await User.findById(req.user.id);
    sendEmailSupport(dbUser, req.body.supportMessage)
};

module.exports = { contactUs };