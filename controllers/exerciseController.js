const Exercise = require("../models/exerciseModel");
const Workout = require("../models/workoutModel");

// GET all exercises for a specific workout
exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({ workout: req.params.workoutId });
    res.status(200).json({
      status: "success",
      data: exercises,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// GET an exercise by ID
exports.getExercise = async (req, res) => {
  try {
    const exercise = await Exercise.find({
      _id: req.params.exerciseId,
      workout: req.params.workoutId,
    });
    if (!exercise) {
      return res.status(404).json({
        status: "fail",
        message: "Exercise not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: exercise,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// POST an exercise for a specific workout
exports.createExercise = async (req, res) => {
  try {
    const workoutId = req.params.workoutId;

    const workout = await Workout.findOne({ _id: workoutId });

    if (!workout) {
      return res.status(404).json({
        status: "fail",
        message: "Workout not found",
      });
    }

    const exerciseData = {
      ...req.body,
      workout: workoutId,
    };

    const newExercise = await Exercise.create(exerciseData);

    workout.exercises.push(newExercise._id);

    await workout.save();

    res.status(201).json({
      status: "success",
      data: newExercise,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// PUT update an exercise for a specific workout
exports.updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findOneAndUpdate(
      { _id: req.params.exerciseId, workout: req.params.workoutId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!exercise) {
      return res.status(404).json({
        status: "fail",
        message: "Exercise not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: exercise,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// DELETE an exercise for a specific workout
exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findOneAndDelete({
      _id: req.params.exerciseId,
      workout: req.params.workoutId,
    });

    if (!exercise) {
      return res.status(404).json({
        status: "fail",
        message: "Exercise not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
