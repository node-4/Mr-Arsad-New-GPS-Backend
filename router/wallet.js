const express = require('express');
const Wallet = require('../controllers/wallet');
const isAuth = require('../middleware/auth');


const router = express();

router.post('/add', isAuth.isAuthenticatedUser, Wallet.addMoney );
router.post('/remove', isAuth.isAuthenticatedUser, Wallet.removeMoney);
router.get('/getwallet', isAuth.isAuthenticatedUser, Wallet.getWallet)



module.exports = router;

