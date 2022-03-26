const isEmpty = require('is-empty');
const { Journal } = require('../models/journal')


const addJournal = async (req, res) => {
	const { title, body } = req.body;

	if (isEmpty(title)) {
		res.status(400).json({ message: "Journal title can't be empty", success: false })
	} else {
		const dbJournal = new Journal({
			title: title,
			body: body || '',
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


const getJournals = (req, res) => {
	Journal.find({ _UID: req.user.id }, { __v: 0, _UID: 0 })
		.then(journals => {
			res.json({ journals })
		})
		.catch(err => {
			console.log(err)
		})
}

const updateJournal = (req, res) => {
	const { title, body, journalID } = req.body;

	if (isEmpty(title)) {
		res.status(400).json({ message: "Journal title can't be empty", success: false })
	} else {
		Journal.findById(journalID)
			.then((dbJournal) => {
				if (dbJournal) {
					dbJournal.title = title;
					dbJournal.body = body || '';

					dbJournal.save()
						.then(() => {
							res.status(201).json({ message: 'Modified journal successfully', success: true });
						})
						.catch((err) => {
							res.status(400).json({ message: `Failed: ${err}`, success: false })
							console.log(`An error occurred while storing the journal in the database: ${err}`)
						});
				} else {
					res.status(400).json({ message: `Journal of id ${journalID} is undefined`, success: false })
				}
			})
			.catch((err) => {
				res.status(400).json({ message: `Error occurred while searching for journal: ${err}`, success: false })
			});
	}
}


module.exports = {
  addJournal,
  getJournals,
  updateJournal,
  deleteJournal
}