import mongoose from "mongoose";

const parkingSlotSchema = new mongoose.Schema({
  slotNo: {
    type: Number,
    // required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['Available', 'Unavailable'],
    default: 'Available'
  }
});


const ParkingSlotModel = mongoose.model('ParkingSlotCollection', parkingSlotSchema);

export default ParkingSlotModel;
