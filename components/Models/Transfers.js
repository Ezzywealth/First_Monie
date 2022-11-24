import mongoose from "mongoose";

const transferSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: String, required: true },
    account_number: { type: String, required: true },
    account_name: { type: String },
    date: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

const Transfers =
  mongoose.models.Transfers || mongoose.model("Transfers", transferSchema);
export default Transfers;
