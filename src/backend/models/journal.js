const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a new schema instance which defines the structure for a journal every time one is created
//journal has a title and a body
const journalSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  _UID: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true })

//creating a model of the schema above to show for the interface
const Journal = mongoose.model('Journal', journalSchema);


//exporting the Journal model for outside scripts to read
module.exports = {
  journalSchema,
  Journal
}