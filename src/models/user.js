import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createAt: Date
});

const User = mongoose.model("User", userSchema);
export default User;
