import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    request_from: { type: String, required: true },
    request_to: { type: String, required: true },
    amount: { type: Number, required: true },
    cost: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Request =
  mongoose.models.Request || mongoose.model("Request", requestSchema);
export default Request;
