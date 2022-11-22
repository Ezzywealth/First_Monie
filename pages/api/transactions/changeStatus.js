import User from "../../../components/Models/User";
import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Unauthorized method" });
  }

  const { id, account_status } = req.body;
  try {
    await db.connect();

    const user = await User.updateOne(
      { _id: id },
      { $set: { account_status: account_status } }
    );

    await db.disconnect();
    res.status(201).send({
      message: "Account Status updated successfully",
      data: user,
    });
  } catch (error) {
    res
      .status(401)
      .send({ message: "There was an error updating the account status" });
  }
};

export default handler;
