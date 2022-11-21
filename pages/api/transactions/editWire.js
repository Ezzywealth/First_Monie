import { getSession } from "next-auth/react";
import db from "../../../utils/db";
import Wire from "../../../components/Models/Wire";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "signin required" });
  }
  const { amount, editingId, date, email, status } = req.body;

  await db.connect();

  try {
    const toUpdateWire = await Wire.findById(editingId);
    toUpdateWire.amount = amount;
    toUpdateWire.date = date;
    toUpdateWire.email = email;
    toUpdateWire.status = status;

    await toUpdateWire.save();
    await db.disconnect();
    res.status(201).send({
      message: "Transaction updated successfully",
      toUpdateWire,
    });
  } catch (error) {
    res.status(401).send({
      message: "Transaction could not be updated, try again later",
    });
  }
}

export default handler;
