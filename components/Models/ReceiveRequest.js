import mongoose from "mongoose";

const receiveSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    from: { type: String, required: true },
    amount: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Receive =
  mongoose.models.Receive || mongoose.model("Receive", receiveSchema);
export default Receive;
