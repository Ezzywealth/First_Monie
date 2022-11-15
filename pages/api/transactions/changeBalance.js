import User from "../../../components/Models/User";
import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Unauthorized method" });
  }

  const { id, amount, method } = req.body;

  try {
    await db.connect();
    const user = User.find(
      { _id: id },
      {
        $set: {
          account_balance: parseInt(account_balance) + parseInt(amount),
        },
      }
    );
    await db.disconnect();

    res.status(201).send({ message: "Account Balance updated" });
  } catch (error) {
    res.status(401).send({ message: "Account balance not updated" });
  }
};
