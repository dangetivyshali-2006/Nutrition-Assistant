const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


router.post("/register", async (req, res) => {

    console.log(req.body);

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            name,
            email,
            password: hashedPassword
        });


        await user.save();


        res.json({
            message: "Registration successful"
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });

    }

});


router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });


        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }


        const checkPassword = await bcrypt.compare(
            password,
            user.password
        );


        if (!checkPassword) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }


        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );


        res.json({
            message: "Login successful",
            token
        });


    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


module.exports = router;