const express = require('express');
const journalController = require('../controllers/journalController');
const router = express.Router();


router.post('/create', journalController.addJournal);
router.get('/read', journalController.getJournals);
router.patch('/update', journalController.updateJournal)
router.delete('/delete', journalController.deleteJournal)


module.exports = router;