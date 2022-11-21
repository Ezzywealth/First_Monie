import Transaction from "../../../components/Models/Transactions";
import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Request Method not allowed" });
  }

  const { id } = req.body;
  try {
    await db.connect();

    await Transaction.deleteOne({ _id: id });

    await db.disconnect();

    res.status(201).send({ message: "Transaction successfully deleted!!!" });
  } catch (error) {
    res
      .status(401)
      .send({
        message: "Transaction could not be deleted, try again later!!!",
      });
  }
};
export default handler;
