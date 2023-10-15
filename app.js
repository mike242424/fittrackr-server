const express = require("express");
const app = express();
const cors = require("cors");

const workoutRouter = require("./routes/workoutRoutes");
const exerciseRouter = require("./routes/exerciseRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/workouts", workoutRouter);
app.use("/api/workouts", exerciseRouter);

module.exports = app;
