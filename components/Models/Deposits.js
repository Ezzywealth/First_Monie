import mongoose from "mongoose";

const depositSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    client: { type: String, required: true },
    method: { type: String, required: true },
    status: { type: String, required: true },
    plan: { type: String, required: true },
    duration: { type: Number, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Deposits =
  mongoose.models.Deposits || mongoose.model("Deposits", depositSchema);
export default Deposits;
