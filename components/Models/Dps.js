import mongoose from "mongoose";

const dpsSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, required: true },
    deposit_amount: { type: String, required: true },
    matured_amount: { type: String, required: true },
    total_installment: { type: String, required: true },
    next_installment: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

const Dps = mongoose.models.Dps || mongoose.model("Dps", dpsSchema);
export default Dps;
