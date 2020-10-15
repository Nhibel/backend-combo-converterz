/** @format */

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/User');

router.post('/signup-admin', userCtrl.signupAdmin);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/verify-token', userCtrl.verifyToken);
router.post('/me', userCtrl.me);

module.exports = router;
