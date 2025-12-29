const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const DB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

//env
dotenv.config();

//database
DB();

const app = express();



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


//69512d3100795fe7eb4e3a97 
//6951e0d4c5d20f1f298d8b47 event
//9218 otp





const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
});

