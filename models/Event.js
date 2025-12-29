const mongoose = require('mongoose');
// const Vendor = require('./Vendor');

const eventSchema = new mongoose.Schema(
    {
    vendor :{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required:true,
    },
    status:{
        type:String,
        enum:['CHECKED_IN' , 'STARTED' , 'COMPLETED'],
        default:'CHECKED_IN',
    },

    checkInPhoto:String,
    latitude:Number,
    longitude:Number,
    checkInTime:Date,

    //OTPs

    startOtp : String,
    endOtp:String,


    //setup progress

    preSetupPhoto: String,
    postSetupPhoto : String,
    notes: String,
},
{timestamps:true}

);

module.exports = mongoose.model('Event',eventSchema);