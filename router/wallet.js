const express = require('express');
const Wallet = require('../controllers/wallet');
const isAuth = require('../middleware/auth');


const router = express();

router.post('/add', isAuth.isAuthenticatedUser, Wallet.addMoney);
router.post('/remove', isAuth.isAuthenticatedUser, Wallet.removeMoney);
router.get('/getwallet', isAuth.isAuthenticatedUser, Wallet.getWallet)
router.get("/allTransactionUser", isAuth.isAuthenticatedUser, Wallet.allTransactionUser);
router.get("/allcreditTransactionUser", isAuth.isAuthenticatedUser, Wallet.allcreditTransactionUser);
router.get("/allDebitTransactionUser", isAuth.isAuthenticatedUser, Wallet.allDebitTransactionUser);
module.exports = router;

