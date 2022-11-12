import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    walletName: { type: String, required: true },
    walletAddress: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Wallets =
  mongoose.models.Wallets || mongoose.model("Wallets", walletSchema);
export default Wallets;
