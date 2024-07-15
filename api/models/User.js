import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const user = mongoose.model("User", userSchema);
// This is the user you will need at the time of import everywhere in your application
