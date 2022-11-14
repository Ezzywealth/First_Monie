import mongoose from "mongoose";

const fdrSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, required: true },
    amount: { type: String, required: true },
    profit_type: { type: String, required: true },
    profit: { type: String, required: true },

    status: { type: String },
  },
  {
    timestamps: true,
  }
);

const Fdr = mongoose.models.Fdr || mongoose.model("Fdr", fdrSchema);
export default Fdr;
