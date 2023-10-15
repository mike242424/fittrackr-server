const express = require("express");
const exerciseController = require("../controllers/exerciseController");

const router = express.Router();

router
  .route("/:workoutId/exercises")
  .get(exerciseController.getAllExercises)
  .post(exerciseController.createExercise);

router
  .route('/:workoutId/exercises/:exerciseId')
  .get(exerciseController.getExercise)
  .put(exerciseController.updateExercise)
  .delete(exerciseController.deleteExercise);

module.exports = router;
