import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    userName: { type: String, required: true },
    country: { type: String, required: true },
    birthday: { type: String, required: true },
    sex: { type: String, required: true },
    marital_status: { type: String, required: true },
    occupation: { type: String, required: true },
    account_number: { type: String, required: true },
    secret_code: { type: String, required: false, default: "0000000" },
    account_balance: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
