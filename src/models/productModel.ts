import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id:{type:String},
    name:{type:String},
    quantity:{type:Number},
    price:{type:Number},
    description:{type:String}
})

export default mongoose.model("products" , productSchema);