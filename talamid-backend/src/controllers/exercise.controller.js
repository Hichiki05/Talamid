const path = require('path');
const exerciseService = require('../services/exercise.service');

const submitExercise = async (req, res) => {
  try {
    console.log('FILES:', req.files);
    console.log('BODY:', req.body);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const submissionData = {
      studentId: req.body.studentId,
      exerciseId: req.body.exerciseId,
      filePath: req.files[0].path, // store first file (or loop later)
      notes: req.body.notes
    };

    const submissionId = await exerciseService.submitExercise(submissionData);

    res.status(201).json({
      message: 'Exercise submitted',
      submissionId
    });
  } catch (err) {
    console.error('Controller error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitExercise };

