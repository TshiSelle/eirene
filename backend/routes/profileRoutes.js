const express = require('express');
const { changeName, setProfilePicture, fetchPic, deleteProfilePic } = require('../controllers/profileController');
const router = express.Router();
const fileUpload = require('express-fileupload');
const verifyJWT = require('../middleware/TokenVerification');

router.patch('/editName', changeName);
router.get('/getProfilePic', verifyJWT, fetchPic);
router.post('/setProfilePic', verifyJWT, fileUpload(),  setProfilePicture);
router.delete('/removeProfilePic', verifyJWT, deleteProfilePic);

module.exports = router;
