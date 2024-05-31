import mongoose from "mongoose";

const dbinit = async () => {
    mongoose.connection.on('connected', () => console.log('Connected to Mongo DB'))
    try {
        await mongoose.connect(process.env.DB_URI!)
    } catch (err) {
        console.log("Unable to connect to Mongo DB", err)
    }
}

export default dbinit