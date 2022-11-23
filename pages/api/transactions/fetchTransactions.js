import Transaction from "../../../components/Models/Transactions";
import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Unauthorized method" });
  }

  const { id } = req.body;
  try {
    await db.connect();
    const data = await Transaction.find({ user: id }).lean();
    await db.disconnect();
    res.status(201).send({ data });
  } catch (error) {
    res.status(401).send({ message: "There was an error, please try again" });
  }
};
export default handler;
