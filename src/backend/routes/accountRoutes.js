const express = require('express');
const router = express.Router();
const accounts = require('../controllers/accountController');
const verifyJWT = require('../middleware/TokenVerification');



router.post('/login', accounts.login);
router.get('/verify/:emailVerificationToken', accounts.verifyEmail);
router.post('/changePass', verifyJWT, accounts.changePassword);
router.post('/forgotPass', accounts.forgotPassword);
router.post('/resetPass/:username/:passResetToken', accounts.resetPass)
router.get('/resetPass/:username/:passResetToken', accounts.resetPassPage);

module.exports = router;