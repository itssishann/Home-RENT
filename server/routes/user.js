const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const ElectricityBill = require("../models/ElectricityBill");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;
const router = express.Router();

const signUpSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  roomId: zod.string(),
  password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
  const { name, email, roomId, password } = req.body;
  const { success } = signUpSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ msg: "Incorrect Inputs" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User Already Exists" });
    }

    const hashPass = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email,
      roomId,
      password: hashPass,
    });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);

    return res.status(201).json({
      message: "User Created",
      token,
      userName: name,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

const signinBody = zod.object({
  email: zod.string(),
  password: zod.string()
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Invalid Inputs" });
  }

  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        message: "Email Not exist"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const userRole = existingUser.userRole;
    const token = jwt.sign({ userId: existingUser._id, userRole }, JWT_SECRET);
    return res.json({ token });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error
    });
  }
});

// Middleware to check JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).send({ message: "No token provided." });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: "Failed to authenticate token." });
    }
    req.userId = decoded.userId; 
    next();
  });
};

// User route to check bills
router.get("/checkBill", verifyToken, async (req, res) => {
  try {
    const bills = await ElectricityBill.find({ userId: req.userId });
    res.json({
      msg: "Success",
      bills: bills
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error.", error });
  }
});

router.get("/me", verifyToken, async (req, res) => {
  try {
    // Ensure req.userId is set by the verifyToken middleware
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    const user = await User.findById(req.userId, 'name email'); // Fetch only name and email

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      message: "Success",
      data: {
        userName: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error });
  }
});

module.exports = router;
