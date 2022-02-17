const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const therapistSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  gender: { type: String, required: true },
  degree: { type: String },
  university: { type: String },
  officeAddress: { type: String },
  phone: { type: String },
  description: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
}, { timestamps: true })

const Therapist = mongoose.model('Therapist', therapistSchema);

module.exports = { Therapist };