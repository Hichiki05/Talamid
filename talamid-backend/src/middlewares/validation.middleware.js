// src/middlewares/validation.middleware.js

const validateExerciseSubmission = (req, res, next) => {
  const { studentId, exerciseId, notes } = req.body;

  // Check required text fields
  if (!studentId || !exerciseId || !notes) {
    return res.status(400).json({
      success: false,
      message: 'studentId, exerciseId, and notes are required'
    });
  }

  // Check uploaded files (for multiple files)
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'At least one exercise file is required'
    });
  }

  // Optional: limit maximum files if needed (should match routes)
  if (req.files.length > 5) {
    return res.status(400).json({
      success: false,
      message: 'You can upload a maximum of 5 files'
    });
  }

  next();
};

module.exports = {
  validateExerciseSubmission
};
