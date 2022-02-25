const express = require('express');
const therapists = require('../controllers/therapistController');

const router = express.Router();

router.get('/:id', therapists.getTherapist);


module.exports = router;