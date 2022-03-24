const express = require('express');
const { changeName } = require('../controllers/profileController');
const router = express.Router();


router.patch('/editName', changeName);


module.exports = router;