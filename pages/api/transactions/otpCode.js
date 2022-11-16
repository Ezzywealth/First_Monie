import User from "../../../components/Models/User";
import db from "../../../utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Unauthorized method" });
  }
  const session = await getSession({ req });
  const { _id, email } = session.user;

  try {
    await db.connect();
    const user = await User.find({ email });
    await db.disconnect();

    res.status(201).send(user);
  } catch (error) {
    res.status(401).send(error);
  }
};
export default handler;
