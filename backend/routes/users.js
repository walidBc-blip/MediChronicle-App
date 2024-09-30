const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const router = express.Router();

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

// Register endpoint
router.post(
  "/register",
  [
    // Validation middleware
    check("fullName", "Full name is required").not().isEmpty(),
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
    check("role", "Valid role is required").isIn([
      "Patient",
      "Doctor",
      "Admin",
    ]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user already exists
      let user = await User.findOne({ username: req.body.username });
      if (user) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user
      user = new User({
        fullName: req.body.fullName,
        username: req.body.username,
        password: hashedPassword,
        role: req.body.role,
      });

      // Save the user to the database
      await user.save();

      // Respond with a JSON message
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error in saving user", error: error.message });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // log to check the actual userName retrieved from the database
    console.log("Fetched user name from database:", user.username);

    const userName = user.username || "No Name Provided";

    // log to check the userName value before signing the token
    console.log("Username to be encoded in token:", userName);

    const token = jwt.sign(
      { userId: user._id, role: user.role, userName: userName },
      jwtSecret,
      { expiresIn: "1h" }
    );

    // log full response object to debug
    // console.log("Response being sent:", { token, role: user.role, userName });

    res.json({ token, role: user.role, userName: userName, id: user.id });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// router.get("/:username", async (req, res) => {

// 	try {

// 		// console.log(req.params.username);

//     const loggedInUsername = req.params.username;

// 		const filteredUsers = await User.find({ username: {$ne: loggedInUsername} }).select("-password");

// 		res.json(filteredUsers);

// 	} catch (error) {

// 		console.error("Error in getUsersForSidebar: ", error.message);

// 		res.status(500).json({ error: "Internal server error" });

// 	}

// });

// module.exports = router;

router.get("/:username", async (req, res) => {
  try {
    const loggedInUsername = req.params.username;

    // Filter to find users who are doctors and not the logged-in user
    const filteredUsers = await User.find({
      username: { $ne: loggedInUsername },

      role: "Doctor",
    }).select("-password"); // excluding the password field from the result

    res.json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);

    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
