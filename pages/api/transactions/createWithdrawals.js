import Transaction from "../../../components/Models/Transactions";
import Withdrawals from "../../../components/Models/Withdrawals";

import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Unauthorized request" });
  }

  const { amount, method, status, email, id, TXNID } = req.body;
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const createdDate = new Date().toLocaleString("en-US", options);

  const newWithdrawals = {
    amount,
    method,
    date: createdDate,
    status,
  };

  const newTransaction = {
    user: id,
    amount,
    client: email,
    date: createdDate,
    type: "Withdrawals",
    status: "completed",
    TXNID,
    category: "debit",
  };

  try {
    await db.connect();
    await Withdrawals.insertMany(newWithdrawals);
    await Transaction.insertMany(newTransaction);
    await db.disconnect();

    res
      .status(201)
      .send({ message: "Withdrawal request created successfully" });
  } catch (error) {
    res
      .status(401)
      .send({ message: "There was an error, please try again later" });
  }
};

export default handler;
