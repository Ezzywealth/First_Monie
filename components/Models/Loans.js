import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    LOAN_AMOUNT: { type: String, required: true },
    PLAN_NO: { type: String, required: true },
    PER_INSTALLMENT: { type: String, required: true },
    TOTAL_INSTALLEMENT: { type: String, required: true },
    NEXT_INSTALLEMENT: { type: String, required: false },
    STATUS: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Loan = mongoose.models.Loan || mongoose.model("Loan", loanSchema);
export default Loan;
