const express = require('express');
const router = express.Router();
const accounts = require('../controllers/accountController');
const verifyJWT = require('../middleware/TokenVerification');




router.post('/login', accounts.login);
router.get('/verify/:uniqueString', accounts.verifyEmail)
router.post('/changePass', verifyJWT, accounts.changePassword)
router.get('/forgotPass',accounts.forgotPassword);
router.post('/resetPass/submit/:uniqueString', accounts.resetPass)
router.get('/resetPass/:uniqueString', accounts.resetPassPage)


module.exports = router;