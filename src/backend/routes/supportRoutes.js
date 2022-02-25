const express = require('express');
const support = require('../controllers/support');
const router = express.Router();
const verifyJWT = require('../middleware/TokenVerification');

router.post('/user', verifyJWT, support.contactUs);
router.post('/external', support.externalContactUs);

module.exports = router
