import mongoose from "mongoose";

//degining schema
const registerSchema = new mongoose.Schema({
    name:{ type:String, required:true, trim:true},
    email:{ type:String, required:true, trim:true},
    password:{ type:String, required:true, trim:true},
})

//compiling schema or creating model
const registerModel = mongoose.model('registerCollection', registerSchema)

export default registerModel