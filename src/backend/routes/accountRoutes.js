const express = require('express');
const verifyJWT = require('../middleware/TokenVerification');
const accounts = require('../controllers/accountController');

const router = express.Router();

router.post('/login', accounts.login);
router.get('/verify/:emailVerificationToken', accounts.verifyEmail);
router.post('/changePass', verifyJWT, accounts.changePassword);
router.post('/forgotPass', accounts.forgotPassword);
router.route('/resetPass/:username/:passResetToken')
    .get(accounts.resetPassPage)
    .post(accounts.resetPass);

module.exports = router;