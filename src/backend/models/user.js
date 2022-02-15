const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  gender: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  emailVerificationToken: { type: String, unique: true },
  passResetToken: { type: String },
  passResetTokenExpirationDate: { type: Number },

}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  userSchema
}