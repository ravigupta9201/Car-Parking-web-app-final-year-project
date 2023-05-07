import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    userFeedback:{type:String}
})

const feedbackModel = mongoose.model("feedbackCollection", feedbackSchema)

export default feedbackModel;