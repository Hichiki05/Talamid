const express = require('express');
const router = express.Router();
const { createPayment, paymentWebhook } = require('../controllers/payment.controller');

router.post('/create', createPayment);
router.post('/webhook', paymentWebhook); // Paymee calls this

module.exports = router;


