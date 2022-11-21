import { getSession } from "next-auth/react";
import bcryptjs from "bcryptjs";
import db from "../../../utils/db";
import Transaction from "../../../components/Models/Transactions";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "signin required" });
  }
  const { amount, type, editingId, date, email } = req.body;

  await db.connect();
  const toUpdateTransaction = await Transaction.findById(editingId);
  toUpdateTransaction.amount = amount;
  toUpdateTransaction.type = type;
  toUpdateTransaction.date = date;
  toUpdateTransaction.email = email;

  await toUpdateTransaction.save();
  await db.disconnect();
  res.status(201).send({
    message: "Transaction updated successfully",
    toUpdateTransaction,
  });
  try {
  } catch (error) {
    res.status(401).send({
      message: "Transaction could not be updated, try again later",
    });
  }
}

export default handler;
