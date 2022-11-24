import mongoose from "mongoose";

const wireSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: String, required: true },
    bank_name: { type: String, required: true },
    account_name: { type: String, required: true },
    account_number: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Wire = mongoose.models.Wire || mongoose.model("Wire", wireSchema);
export default Wire;
