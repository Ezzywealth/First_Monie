import { getSession } from "next-auth/react";
import db from "../../../utils/db";
import Transfers from "../../../components/Models/Transfers";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "signin required" });
  }
  const { amount, status, editingId, date, email } = req.body;

  await db.connect();

  try {
    const toUpdateTransfer = await Transfers.findById(editingId);
    toUpdateTransfer.amount = amount;
    toUpdateTransfer.status = status;
    toUpdateTransfer.date = date;
    toUpdateTransfer.email = email;
    await toUpdateTransfer.save();
    await db.disconnect();
    res.status(201).send({
      message: "Transaction updated successfully",
      toUpdateTransfer,
    });
  } catch (error) {
    res.status(401).send({
      message: "Transaction could not be updated, try again later",
    });
  }
}

export default handler;
