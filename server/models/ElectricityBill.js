// models/ElectricityBill.js
const mongoose = require('mongoose');

const electricityBillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  billingPeriodStart: {
    type: Date,
    required: true,
  },
  billingPeriodEnd: {
    type: Date,
    required: true,
  },
  unitsConsumed: {
    type: Number,
    required: true,
  },
  amountDue: {
    type: String,
    required: true,
  },
  renterName:{
    type: String,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const ElectricityBill = mongoose.model('ElectricityBill', electricityBillSchema);
module.exports = ElectricityBill;
