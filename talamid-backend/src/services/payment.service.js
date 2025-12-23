const axios = require('axios');
const Payment = require('../models/payment.model');

const createPayment = async ({ studentId, amount }) => {
  // 1. Save payment in DB as pending
  const paymentId = await Payment.createPayment({
    studentId,
    amount,
    status: 'pending',
    provider: 'CMI'
  });

  // 2. (Mock) payment gateway response for now
  return {
    paymentId,
    paymentUrl: `https://payment-gateway.test/pay/${paymentId}`
  };
};

module.exports = { createPayment };


