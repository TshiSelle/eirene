const express = require('express');
const router = express.Router();
const accounts = require('../controllers/accountController');
const verifyJWT = require('../middleware/TokenVerification');



router.post('/login', accounts.login);
router.get('/verify/:emailVerificationToken', accounts.verifyEmail);
router.post('/changePass', verifyJWT, accounts.changePassword);
router.route('/resetPass/:username/:passResetToken')
    .get(accounts.resetPassPage)
    .post(accounts.resetPass);

module.exports = router;