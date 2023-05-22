const express = require('express');
const User = require('../controllers/user_controller')
const auth = require('../middleware/auth')
const axios = require("axios");
const {smartAPI , WebSocket, SmartAPI } = require('smartapi-javascript');

const router = express();


router.post('/sendotp', User.sendOtp);
router.post('/verify', User.VerifyOtp );
router.post('/login', User.SignIn);
router.put('/update/:id', [auth.isAuthenticatedUser, User.UpdateProfile]);
router.get('/me', [auth.isAuthenticatedUser,User.getUserById ]);
 





module.exports = router;
