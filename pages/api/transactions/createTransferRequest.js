import Transaction from "../../../components/Models/Transactions";
import Transfers from "../../../components/Models/Transfers";
import User from "../../../components/Models/User";
import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Unauthorized request" });
  }

  const { amount, account_name, account_number, id, email } = req.body;
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const createdDate = new Date().toLocaleString("en-US", options);
  const max = 9999;
  const min = 1000;
  const randNum = Math.ceil(Math.random() * (max - min) + min);

  const newTransfer = {
    amount,
    account_name,
    account_number,
    date: createdDate,
    type: "Transfer",
    status: "completed",
  };
  const newTransaction = {
    user: id,
    amount,
    client: email,
    date: createdDate,
    type: "Transfer",
    status: "completed",
    TXNID: `FMB23642423${randNum}`,
    category: "debit",
  };

  try {
    await db.connect();
    await Transaction.insertMany(newTransaction);
    await Transfers.insertMany(newTransfer);
    const toUpdateUser = await User.findById(id);
    toUpdateUser.account_balance -= amount;
    await toUpdateUser.save();
    await db.disconnect();

    res.status(201).send({ message: "Transfer successful" });
  } catch (error) {
    res.status(401).send({ message: "There was an error, please try again" });
  }
};

export default handler;
