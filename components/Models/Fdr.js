import mongoose from "mongoose";

const fdrSchema = new mongoose.Schema(
  {
    plan: { type: String, required: true },
    amount: { type: String, required: true },
    profit_Type: { type: String, required: true },
    profit: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Fdr = mongoose.models.Fdr || mongoose.model("Fdr", fdrSchema);
export default Fdr;
