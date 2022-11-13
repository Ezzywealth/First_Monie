import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    client: { type: String, required: true },
    date: { type: String, required: true },
    type: { type: String, required: true },
    TXNID: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
export default Transaction;
