const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 fname: string,
 lname: string,
 email: string,
 
})