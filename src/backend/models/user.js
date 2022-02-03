const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    ref: 'Journal'
  }

},{ timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  userSchema
}