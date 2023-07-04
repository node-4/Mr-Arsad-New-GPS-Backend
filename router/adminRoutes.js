const express = require('express');
const User = require('../controllers/adminController')
const auth = require('../middleware/adminAuth')
const router = express();
router.post('/createUser', User.createUser);
router.post('/login', User.login);
router.get('/getProfile', auth.verifyToken, User.getProfile);
router.get('/getUsers', auth.verifyToken, User.getUsers);
router.get('/getUser/:id', auth.verifyToken, User.getUserById);
router.delete('/deleteUser/:id', auth.verifyToken, User.deleteUser);
router.put('/changePassword', auth.verifyToken, User.changePassword);
router.put('/updateProfile', auth.verifyToken, User.updateProfile);
router.get('/getDevice', auth.verifyToken, User.getDevice);
router.get('/getDevice/:id', auth.verifyToken, User.getDeviceById);
router.get('/allDebitTransaction', auth.verifyToken, User.allDebitTransactionUser);
router.get('/allTransaction', auth.verifyToken, User.allTransactionUser);
router.get('/allcreditTransaction', auth.verifyToken, User.allcreditTransactionUser);
module.exports = router;
