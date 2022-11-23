import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    userName: { type: String, required: true },
    country: { type: String, required: false },
    birthday: { type: String, required: false },
    sex: { type: String, required: false },
    marital_status: { type: String, required: false },
    occupation: { type: String, required: true },
    account_number: { type: String, required: false, unique: true },
    secret_code: { type: String, required: false, default: "0000000" },
    account_balance: { type: Number, required: true, default: 0 },
    account_status: { type: String, required: true, default: "active" },
    image: { type: String, required: true, default: "/hero8.jpg" },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
