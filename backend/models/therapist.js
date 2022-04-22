const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const therapistSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  gender: { type: String, required: true },
  degree: { type: String },
  university: { type: String },
  officeAddress: { type: String },
  yearsOfExperience : { type: Number },
  title : { type: String },
  phone: { type: String },
  description: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String }
}, { timestamps: true })

therapistSchema.index({ fname: 'text', lname: 'text' });

const Therapist = mongoose.model('Therapist', therapistSchema);

module.exports = { Therapist };