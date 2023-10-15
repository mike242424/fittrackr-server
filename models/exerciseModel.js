const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: [Number],
      required: true,
    },
    weight: {
      type: [Number],
      required: true,
    },
    workout: {
      type: Schema.Types.ObjectId,
      ref: "Workout",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
