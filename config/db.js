const mongoose = require("mongoose");

const connectDB = async () => {
    try{
       await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDb Connected');
    }catch (error) {
    console.error("MongoDb connection failed:", error.message);
    throw error;
    }
    
};

module.exports = connectDB;