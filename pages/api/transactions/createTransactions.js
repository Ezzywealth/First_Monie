import Transaction from "../../../components/Models/Transactions";
import Transfers from "../../../components/Models/Transfers";
import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Unauthorized request" });
  }

  const { amount, client, type, TXNID } = req.body;
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const createdDate = new Date().toLocaleString("en-US", options);

  const newTransaction = {
    amount,
    client,
    date: createdDate,
    type,
    status: "completed",
    TXNID,
  };

  try {
    await db.connect();
    await Transaction.insertMany(newTransaction);
    await db.disconnect();

    res.status(201).send({ message: "Transaction created successfully" });
  } catch (error) {
    res.status(401).send({ message: "There was an error, please try again" });
  }
};

export default handler;
