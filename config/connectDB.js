import mongoose from "mongoose";
mongoose.set('strictQuery', true); 

const connectDB = async (DATABASE_URL)=>{
    try {
        const DB_OPTIONS = {
            dbName:"booking"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS)
        console.log('Database Connected Successfully...')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB