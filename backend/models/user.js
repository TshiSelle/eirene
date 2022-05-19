const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		fname: { type: String, required: true },
		lname: { type: String, required: true },
		gender: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		verified: { type: Boolean, default: false },
		profilePic: { type: String, default: undefined },
		emailVerificationToken: { type: String, unique: true },
		passResetToken: { type: String, expires: '1hr' },
		passResetTokenExpirationDate: { type: Number, expires: '1hr' },
		deactivationDate: { type: Date, default: undefined },
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = { User };
