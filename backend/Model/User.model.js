import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    displayName: String,
    email: String,
    photo: String,
    isAdmin: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);