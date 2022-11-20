import User from "../../../components/Models/User";
import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Unauthorized method" });
  }

  const { id, amount, method, currentBalance } = req.body;
  let newBalance = 0;
  try {
    await db.connect();
    if (method === "add_amount") {
      newBalance = parseInt(currentBalance) + parseInt(amount);
      const user = await User.updateOne(
        { _id: id },
        { $set: { account_balance: newBalance } }
      );
    } else if (method === "subtract_amount") {
      newBalance = parseInt(currentBalance) - parseInt(amount);
      const user = await User.updateOne(
        { _id: id },
        { $set: { account_balance: newBalance } }
      );
    }

    await db.disconnect();
    res.status(201).send({
      message: "Account balance updated successfully",
      data: newBalance,
    });
  } catch (error) {
    res
      .status(401)
      .send({ message: "There was an error updating the account balance" });
  }
};

export default handler;
