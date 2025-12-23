const db = require('../config/db');

const createPayment = async (data) => {
  const query = `
    INSERT INTO payments
      (student_id, amount, currency, status, provider, created_at)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;

  const values = [
    data.studentId,
    data.amount,
    data.currency || 'MAD',
    data.status || 'pending',
    data.provider || 'CMI'
  ];

  const [result] = await db.query(query, values);
  return result.insertId;
};

const updateStatus = async (paymentId, status) => {
  const query = 'UPDATE payments SET status = ? WHERE id = ?';
  await db.query(query, [status, paymentId]);
};

module.exports = { createPayment, updateStatus };


