const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const router = express.Router();
const ElectricityBill = require("../models/ElectricityBill");
const { User } = require("../models/user");

module.exports = router;

// Middleware to check JWT token and user role
const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];  // Use lowercase 'authorization'
  if (!authHeader) {
    return res.status(403).send({ message: "No token provided." });
  }

  const token = authHeader.split(' ')[1];  // Extract the token after 'Bearer'
  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: "Failed to authenticate token." });
    }

    // Check if the user role is admin
    if (decoded.userRole !== 'isAdmin') {
      return res.status(403).send({ message: "Requires admin role." });
    }
    req.userId = decoded.id;
    next();
  });
};

// Use the middleware for the /admin routes
router.use("/admin", verifyAdminToken);

router.get("/admin/users", async (req, res) => {  // Ensure this route uses the middleware
  try {
    const users = await User.find({userRole:"isUser"});
    const userData = users.map((user) => ({
      Id: user._id,
      roomId: user.roomId, // Make sure the property name matches the actual field name
      name: user.name,
    }));
    res.json({
      message: "Success",

      data:userData
  });
  } catch (error) {
    res.status(500).json({
      message: "Failure Internal Server Error",
      error,
    });
  }
});

router.post("/admin/add-unit", async (req, res) => {  // Ensure this route uses the middleware
  const electricityAddBody = zod.object({
    userId: zod.string(),
    renterName:zod.string(),
    billingPeriodStart: zod.string(),
    billingPeriodEnd: zod.string(),
    unitsConsumed: zod.number(),
    amountDue: zod.string()
  });

  const result = electricityAddBody.safeParse(req.body);

  if (!result.success) {
    return res.status(400).send({ message: result.error.errors });
  }

  try {
    const newBill = await ElectricityBill.create({
      userId: result.data.userId,
      billingPeriodStart: result.data.billingPeriodStart,
      billingPeriodEnd: result.data.billingPeriodEnd,
      renterName:result.data.renterName,
      unitsConsumed: result.data.unitsConsumed,
      amountDue: result.data.amountDue
    });

    res.json({
        msg:"Success",
        billCreated: newBill
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error." });
  }
});
