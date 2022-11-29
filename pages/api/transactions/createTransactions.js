import Transaction from "../../../components/Models/Transactions";
import db from "../../../utils/db";
import { getSession } from "next-auth/react";
import User from "../../../components/Models/User";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Unauthorized request" });
  }
  const session = await getSession({ req });
  const { user } = session;
  const { amount, email, category, TXNID, status, date, description, id } =
    req.body;

  const newTransaction = {
    user: id ? id : user._id,
    amount,
    client: email,
    date,
    type: description,
    status,
    TXNID,
    category,
  };

  try {
    await db.connect();
    await Transaction.insertMany(newTransaction);
    const toUpdateUser = await User.findById(id);

    if (category === "credit") {
      toUpdateUser.account_balance =
        toUpdateUser.account_balance + parseInt(amount);
    } else if (category === "debit") {
      toUpdateUser.account_balance =
        toUpdateUser.account_balance - parseInt(amount);
    }
    await toUpdateUser.save();
    await db.disconnect();

    res.status(201).send({
      message: "Transaction created successfully",
      data: toUpdateUser,
    });
  } catch (error) {
    res.status(401).send({ message: "There was an error, please try again" });
  }
};

export default handler;
