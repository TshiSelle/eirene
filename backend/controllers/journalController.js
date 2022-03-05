const { Journal } = require('../models/journal')


const addJournal = async (req, res) => {
  const journal = req.body
  const takenTitle = await Journal.findOne({ title: journal.title.toLowerCase() })
  if (takenTitle) {
    res.status(400).json({ message: "Journal Title is already used", success: false })
  }
  else {
    const dbJournal = new Journal({
      title: journal.title,
      body: journal.body,
      _UID: req.user.id
    });
    dbJournal.save()
      .then(() => {
        res.status(201).json({ message: 'Created journal successfully', success: true });
      })
      .catch((err) => {
        res.status(400).json({ message: `Failed: ${err}`, success: false })
        console.log(`An error occurred while storing the journal in the database: ${err}`)
      });
  }
}
const deleteJournal = async (req, res) => {
  Journal.findOne({ _id: req.Journal._id })
    .populate()
  Journal.remove()
    .then(deleteJouranl => {
      res.json({ deleteJournal })
    })
    .catch(err => {
      console.log(err)
    })
}


module.exports = {
  addJournal,
  deleteJournal
}