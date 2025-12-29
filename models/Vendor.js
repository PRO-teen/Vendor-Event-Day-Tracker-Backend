const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },

    },
    { timestamps:true }
);


module.exports = mongoose.model('Vendor', vendorSchema);