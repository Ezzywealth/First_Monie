import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    client: { type: String, required: true },
    method: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    wallet: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Withdrawals =
  mongoose.models.Withdrawals ||
  mongoose.model("Withdrawals", withdrawalSchema);
export default Withdrawals;
