import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    phone:{type:Number, required:true},
    vehicletype:{type:String, required:true},
    plateno:{type:Number, required:true},
    date:{type:Date, required: true},
    time:{ type:String , required: true},
    hours:{ type:Number , required:true }
})

const bookingModel = mongoose.model('bookingCollection', bookingSchema)

export default bookingModel