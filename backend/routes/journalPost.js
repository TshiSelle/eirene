const express = require('express')
const verifyJWT = require('../middleware/TokenVerification')
const journalController = require('../controllers/journalController')
const router = express.Router()
//importing the journals model
const { Journal } = require('../models/journal')
//routing the user to journals to find all journals created by them by checking their ID
router.get('/journals',verifyJWT, (req, res) => {
  Journal.find({ postedBy: req.user._id })
    .populate()
    .then(journals => {
      res.json({ journals })
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/create', verifyJWT, journalController.addJournal)


module.exports = router;