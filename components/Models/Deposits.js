import mongoose from "mongoose";

const depositSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: String, required: true },
    method: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Deposits =
  mongoose.models.Deposits || mongoose.model("Deposits", depositSchema);
export default Deposits;
