import Transfers from "../../../components/Models/Transfers";
import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Unauthorized request" });
  }

  const { amount, account_name, account_number, date } = req.body;
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const createdDate = new Date().toLocaleString("en-US", options);

  const newTransfer = {
    amount,
    account_name,
    account_number,
    date: createdDate,
    type: "Other Bank",
    status: "pending",
  };

  try {
    await db.connect();
    await Transfers.insertMany(newTransfer);
    await db.disconnect();

    res.status(201).send({ message: "Transfer request created successfully" });
  } catch (error) {
    res.status(401).send({ message: "There was an error, please try again" });
  }
};

export default handler;
