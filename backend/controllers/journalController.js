const isEmpty = require('is-empty');
const { validateObjectID } = require('../helperFunctions/inputValidation');
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
	const { journalID }  = req.body;
	const { errors, isValid } = validateObjectID(journalID);

	if (!isValid) {
		res.status(400).json({ ...errors, success: false });
	} else {
		Journal.deleteOne({ _id: journalID, _UID: req.user.id })
		  .then((info) => {
			  if (info.deletedCount === 0) {
				  res.status(400).json({ message: 'Cannot delete this document', success : false })
			  } else {
				  res.status(200).json({ message: 'Journal deleted successfully', success : true })
			  }
		  })
		  .catch((err) => {
			  res.status(400).json({ message: `Error occurred while searching for journal : ${err}`, success: false })
		  })

	}

}


const getJournals = (req, res) => {
	Journal.find({ _UID: req.user.id }, { __v: 0, _UID: 0 })
		.then(journals => {
			res.status(200).json({ journals, success: true })
		})
		.catch(err => {
			res.status(400).json({ message: `Error occurred while searching for journals : ${err}`, success: false })
		})
}

const updateJournal = (req, res) => {
	const { title, body, journalID } = req.body;
	const { errors, isValid } = validateObjectID(journalID);

	if (!isValid) {
		res.status(400).json({ ...errors, success: false });
	} else if (isEmpty(title)) {
		res.status(400).json({ message: "Journal title can't be empty", success: false })
	} else {
		Journal.findOne({ _id : journalID, _UID : req.user.id })
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
					res.status(400).json({ message: `Journal of id ${journalID} is undefined for user ${req.user.id}`,
										   success: false })
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