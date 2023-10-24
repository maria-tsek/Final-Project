import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String },
    profileImage: { type: String },
    otherUserData: { type: String },
    favoritePlaces: [{ type: mongoose.Types.ObjectId, ref: "Place" }],
  },
  { collection: "users" }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
