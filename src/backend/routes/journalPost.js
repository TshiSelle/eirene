const express = require('express')
const router = express.Router()
//importing the journals model
const { Journal } = require('../models/journal')
//routing the user to journals to find all journals created by them by chedcking their ID
router.get('/journals', (req, res) => {
  Journal.find({ postedBy: req.user._id })
    .populate()
    .then(journals => {
      res.json({ journals })
    })
    .catch(err => {
      console.log(err)
    })
})

//router.post('/newJournal', (req, res) => {
//})

module.exports = router