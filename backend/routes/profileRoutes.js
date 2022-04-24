const express = require('express');
const { changeName, setProfilePicture } = require('../controllers/profileController');
const router = express.Router();
const fileUpload = require('express-fileupload');
const verifyJWT = require('../middleware/TokenVerification');

router.patch('/editName', changeName);
router.post('/setProfilePic', verifyJWT, fileUpload(),  setProfilePicture);

module.exports = router;
