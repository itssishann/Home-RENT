// models/User.js
require("dotenv").config()
const MONGO_URL = process.env.MONGODB_URL
const mongoose = require('mongoose');
async function connectDB() {
     try {
        const res = await mongoose.connect(MONGO_URL);
        console.log("DB SUCCESS!");
     } catch (error) {
        console.log("DB FAILED! ",error);
     }
}
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userRole:{
    type:String,
    enum:["isUser","isAdmin"],
    default:"isUser"
  },
  password: {
    type: String,
    required: true,
  }
},{timestamps:true});


const User = mongoose.model('User', userSchema);
module.exports = {User,connectDB};
