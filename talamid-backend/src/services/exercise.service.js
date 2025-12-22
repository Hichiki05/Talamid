// src/services/exercise.service.js
const ExerciseSubmission = require('../models/exerciseSubmission.model');

const submitExercise = async (submissionData) => {
  try {
    const insertId = await ExerciseSubmission.createSubmission(submissionData);
    return insertId;
  } catch (err) {
    console.error('SERVICE ERROR:', err);
    throw err;
  }
};

module.exports = { submitExercise };
