import mongoose from "mongoose";

const supportSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    subject: { type: String, required: true },
    fullName: { type: String, required: true },
    date: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Support =
  mongoose.models.Support || mongoose.model("Support", supportSchema);
export default Support;
