const express = require("express")
const userRoute = require("./routes/user")
const adminRouter = require("./routes/admin")
require("dotenv").config()
const PORT = process.env.PORT || 4000
const cors = require("cors")
const {connectDB} = require("./models/user")
const app = express();
app.use(express.json())
connectDB()
app.use(cors());
app.get("/health",(req,res)=>{
    return res.json({
        message:"Server Working"
    })
})
app.use("/api/v1/",userRoute)
app.use("/api/v1/",adminRouter)
app.listen(PORT,()=>{
    console.log("Started at localhost:",PORT);
})
