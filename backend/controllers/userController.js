const isEmpty = require('is-empty');
const { User } = require('../models/user');

const getUser = (req, res) => {
	const { id } = req.user;
	if (isEmpty(id)) {
		res.status(400).json({ message: 'No ID found', success: false });
	}
	User.findOne(
		{ _id: id },
		{
			password: 0,
			emailVerificationToken: 0,
			passResetToken: 0,
			passResetTokenExpirationDate: 0,
			__v: 0,
			_id: 0,
			updatedAt: 0,
		}
	)
		.then((dbUser) => {
			if (dbUser) {
				res.status(200).json({ message: 'User found', success: true, dbUser });
			} else {
				res.status(400).json({ message: 'User not found, wrong id', success: false });
			}
		})
		.catch((err) => {
			res.status(400).json({
				message: 'Error occurred while searching for user',
				success: false,
			});
		});
};

module.exports = { getUser };
