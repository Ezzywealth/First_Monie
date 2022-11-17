import Loan from "../../../components/Models/Loans";
import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  const {
    loanAmount,
    per_installment,
    total_installment,
    plan_no,
    next_installment,
  } = req.body;

  const newLoan = {
    LOAN_AMOUNT: loanAmount,
    PLAN_NO: plan_no,
    PER_INSTALLMENT: per_installment,
    TOTAL_INSTALLEMENT: total_installment,
    NEXT_INSTALLEMENT: next_installment,
    STATUS: "pending",
  };

  try {
    await db.connect();
    await Loan.insertMany(newLoan);
    await db.disconnect();

    res.status(201).send({ message: "Loan request created successfully" });
  } catch (error) {
    res.status(401).send({ message: "There was an error,please try again" });
  }
};
export default handler;
