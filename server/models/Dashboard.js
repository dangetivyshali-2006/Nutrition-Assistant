const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  waterIntake: {
    type: Number,
    default: 1000,
  },

  calories: {
    type: Number,
    default: 1500,
  },

  bmi: {
    type: String,
    default: "",
  },

  bmiStatus: {
    type: String,
    default: "",
  },

  foodList: [
    {
      name: String,
      calories: Number,
    },
  ],
});

module.exports = mongoose.model("Dashboard", dashboardSchema);