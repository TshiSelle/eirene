const express = require('express');
const therapists = require('../controllers/therapistController');
const { searchTherapists } = require('../controllers/searchController');

const router = express.Router();

router.get('/search', searchTherapists);
router.get('/therapist-description/:id', therapists.getTherapist);
router.post('/createTherapist', therapists.create)


module.exports = router;