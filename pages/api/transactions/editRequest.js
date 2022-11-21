import { getSession } from "next-auth/react";
import Receive from "../../../components/Models/ReceiveRequest";
import db from "../../../utils/db";

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
    const toUpdateRequest = await Receive.findById(editingId);
    toUpdateRequest.amount = amount;
    toUpdateRequest.date = date;
    toUpdateRequest.email = email;
    toUpdateRequest.status = status;

    await toUpdateRequest.save();
    await db.disconnect();
    res.status(201).send({
      message: "Transaction updated successfully",
      toUpdateRequest,
    });
  } catch (error) {
    res.status(401).send({
      message: "Transaction could not be updated, try again later",
    });
  }
}

export default handler;
