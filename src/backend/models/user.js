const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const journalSchema = require('./journal');

const userSchema = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    requied: true
  },
  password: {
    type: String,
    required: true
  },
  _journalid: {
    type: Schema.Types.ObjectId,
    ref: journalSchema
  }

})

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  userSchema
}