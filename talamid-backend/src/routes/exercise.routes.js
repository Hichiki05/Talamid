const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const exerciseController = require('../controllers/exercise.controller');

router.post(
  '/submit',
  upload.array('files', 5),
  exerciseController.submitExercise
);

module.exports = router;

