const express = require('express');
const verifyJWT = require('../middleware/TokenVerification');
const support = require('../controllers/support');

const router = express.Router();

router.post('/user', verifyJWT, support.fromUser);
router.post('/external', support.external);

module.exports = router;
