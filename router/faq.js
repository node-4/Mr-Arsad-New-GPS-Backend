const express = require('express');
const router = express.Router();
const helpController = require('../controllers/faq');
const auth = require('../middleware/adminAuth')

router.get('/', helpController.getAllFaqs);
router.post('/', auth.verifyToken, helpController.createFaq);
router.get('/:id', helpController.getFaqById);
router.put('/:id', auth.verifyToken, helpController.updateFaq);
router.delete('/:id', auth.verifyToken, helpController.deleteFaq);
module.exports = router;
