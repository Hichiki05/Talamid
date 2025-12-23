const paymentService = require('../services/payment.service');
const Payment = require('../models/payment.model');

const createPayment = async (req, res) => {
  try {
    const { studentId, amount } = req.body;

    if (!studentId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'studentId and amount are required'
      });
    }

    const result = await paymentService.createPayment({ studentId, amount });

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Payment initialization failed'
    });
  }
};

// Webhook endpoint for Paymee / payment gateway callback
const paymentWebhook = async (req, res) => {
  try {
    const { paymentId, status } = req.body; // status = 'paid' or 'failed'

    if (!paymentId || !status) {
      return res.status(400).json({ success: false, message: 'Missing paymentId or status' });
    }

    await Payment.updateStatus(paymentId, status);

    console.log(`Payment ${paymentId} updated to status: ${status}`);

    // Respond 200 OK to Paymee
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ success: false });
  }
};

module.exports = { createPayment, paymentWebhook };
