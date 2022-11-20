import User from "../../../components/Models/User";
import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Request Method not allowed" });
  }

  const { id } = req.body;
  try {
    await db.connect();

    await User.deleteOne({ _id: id });

    await db.disconnect();

    res.status(201).send({ message: "User successfully deleted" });
  } catch (error) {
    res.status(401).send({ message: "User could not be deleted" });
  }
};
export default handler;
