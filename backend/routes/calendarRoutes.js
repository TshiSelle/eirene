const express = require('express');
const calendarController = require('../controllers/calendarController');
const router = express.Router();

router.post('/create', calendarController.create);


module.exports = router;