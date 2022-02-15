const { Journal } = require('../models/journal')


const addJournal = async (req, res) => {
  const journal = req.body
  const takenTitle = await Journal.findOne({ title: journal.title.toLowerCase() })
  if (takenTitle) {
    res.status(400).json({ message: "Journal Title is already used" })
  }
  else {
    const dbJournal = new Journal({
      title: journal.title,
      body: journal.body
    });
    dbJournal.save()
      .catch((err) => {
        res.status(400).json({ message: `Failed: ${err}` })
        console.log(`An error occured while storing the journal in the database: ${err}`)
      });
  }
}

module.exports = {
  addJournal
}