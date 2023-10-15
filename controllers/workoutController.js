const Workout = require("../models/workoutModel");
const Exercise = require("../models/exerciseModel");

// GET all workouts
exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().populate("exercises");

    res.status(200).json({
      status: "success",
      data: workouts,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// GET a workout by ID
exports.getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId).populate(
      "exercises"
    );

    if (!workout) {
      return res.status(404).json({
        status: "fail",
        message: "Workout not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: workout,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// POST a workout
exports.createWorkout = async (req, res) => {
  try {
    const newWorkout = await Workout.create(req.body);
    res.status(201).json({
      status: "success",
      data: newWorkout,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// PUT update a workout
exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.workoutId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!workout) {
      return res.status(404).json({
        status: "fail",
        message: "Workout not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: workout,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// DELETE a workout and its associated exercises
exports.deleteWorkout = async (req, res) => {
  try {
    const workoutId = req.params.workoutId;

    const workout = await Workout.findByIdAndDelete(workoutId);

    if (!workout) {
      return res.status(404).json({
        status: "fail",
        message: "Workout not found",
      });
    }

    await Exercise.deleteMany({ workout: workoutId });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
