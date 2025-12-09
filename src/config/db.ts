import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        if(!process.env.MONGODB_URI){
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        // Just use the URI directly - it already has mongodb+srv:// prefix
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}