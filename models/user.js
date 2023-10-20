import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  password: String,
  email: { type: String, unique: true },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;