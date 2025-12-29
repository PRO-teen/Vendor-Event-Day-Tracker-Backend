const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const fs = require("fs");
const path = require("path");
const DB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

//env
dotenv.config();

//database
DB();

const app = express();


const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


//cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json())



//routes

app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes)

app.use('/uploads', express.static('uploads'));



app.get('/',(req,res)=>{
    res.send("server running on 5000");
});






const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
});

