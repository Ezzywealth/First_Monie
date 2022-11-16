import mongoose from "mongoose";

const sendSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    amount: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Send = mongoose.models.Send || mongoose.model("Send", sendSchema);
export default Send;
