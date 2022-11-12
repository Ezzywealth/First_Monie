import User from "../../components/Models/User";
import userData from "../../utils/data";

import db from "../../utils/db";

const handler = async (req, res) => {
  await db.connect();

  await User.deleteMany();
  await User.insertMany(userData.users);
  await db.disconnect();

  res.send({ messgae: "seeded successfully", userData });
};
export default handler;
