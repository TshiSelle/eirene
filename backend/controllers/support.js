const isEmpty = require('is-empty');
const { User } = require('../models/user');
const { sendEmailSupport } = require('../helperFunctions/emailSender');
const { validateEmail } = require('../helperFunctions/inputValidation');
/* incoming data: supportMessage */

const fromUser = async (req, res) => {
	if (isEmpty(req.body.supportMessage)) {
		return res.status(422).json({ message: 'Your support message is empty', success: false });
	}
	res.status(200).json({ message: 'Support message sent!', success: true });
	const dbUser = await User.findById(req.user.id);
	sendEmailSupport(dbUser, req.body.supportMessage);
};

const external = (req, res) => {
	/* fname - lname - email - supportMessage */
	if (isEmpty(req.body.supportMessage)) {
		return res.status(422).json({ message: 'Your support message is empty', success: false });
	}
	const { errors, isValid } = validateEmail(req.body);
	if (!isValid) {
		return res.status(400).json({ ...errors, success: false });
	}
	res.status(200).json({ message: 'Support message sent!', success: true });
	sendEmailSupport(req.body, req.body.supportMessage);
};

module.exports = {
	fromUser,
	external,
};
