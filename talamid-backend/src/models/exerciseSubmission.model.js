// src/models/exerciseSubmission.model.js
const db = require('../config/db');

const createSubmission = async (data) => {
  const query = `
    INSERT INTO exercise_submissions
      (student_id, exercise_id, file_path, notes, submitted_at)
    VALUES (?, ?, ?, ?, NOW())
  `;
  const values = [data.studentId, data.exerciseId, data.filePath, data.notes || null];

  console.log('MODEL QUERY VALUES:', values);

  try {
    const [result] = await db.query(query, values);
    return result.insertId;
  } catch (err) {
    console.error('MODEL ERROR:', err);
    throw err;
  }
};

module.exports = { createSubmission };
