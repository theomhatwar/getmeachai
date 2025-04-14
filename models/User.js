
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    // email from next-auth
    email: { type: String, required: true }, 
    // name is optional 
    name: { type: String},
    // generated from email automatically
    username: { type: String, required: true },
    // background pics
    profilepic: {type: String},
    coverpic: {type: String},
    // from razorpay api keys
    razorpayid: { type: String },
    razorpaysecret: { type: String },
    // default
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    });

 
export default mongoose.models.User || model("User", UserSchema);;
