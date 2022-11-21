import { getSession } from "next-auth/react";
import db from "../../../utils/db";
import Deposits from "../../../components/Models/Deposits";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "signin required" });
  }
  const { amount, method, editingId, date, email, status } = req.body;

  await db.connect();

  try {
    const toUpdateDeposit = await Deposits.findById(editingId);
    toUpdateDeposit.amount = amount;
    toUpdateDeposit.method = method;
    toUpdateDeposit.date = date;
    toUpdateDeposit.email = email;
    toUpdateDeposit.status = status;

    await toUpdateDeposit.save();
    await db.disconnect();
    res.status(201).send({
      message: "Transaction updated successfully",
      toUpdateDeposit,
    });
  } catch (error) {
    res.status(401).send({
      message: "Transaction could not be updated, try again later",
    });
  }
}

export default handler;
