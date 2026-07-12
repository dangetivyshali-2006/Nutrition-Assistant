const express = require("express");
const router = express.Router();

const Dashboard = require("../models/Dashboard");


// Save Dashboard Data
router.post("/save", async (req, res) => {

  try {

    const {
      userId,
      waterIntake,
      calories,
      bmi,
      bmiStatus,
      foodList
    } = req.body;

    let dashboard = await Dashboard.findOne({ userId });

    if (dashboard) {

      dashboard.waterIntake = waterIntake;
      dashboard.calories = calories;
      dashboard.bmi = bmi;
      dashboard.bmiStatus = bmiStatus;
      dashboard.foodList = foodList;

      await dashboard.save();

    } else {

      dashboard = new Dashboard({
        userId,
        waterIntake,
        calories,
        bmi,
        bmiStatus,
        foodList
      });

      await dashboard.save();

    }

    res.json({
      message: "Dashboard saved successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});


// Get Dashboard Data
router.get("/:userId", async (req, res) => {

  try {

    const dashboard = await Dashboard.findOne({
      userId: req.params.userId
    });

    res.json(dashboard);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;