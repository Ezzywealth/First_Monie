import User from "../../../components/Models/User";
import db from "../../../utils/db";

const handler = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(401).send({ message: "Unauthorized method" });
  }

  const { id, imageUrl } = req.body;
  try {
    await db.connect();

    const user = await User.updateOne(
      { _id: id },
      { $set: { image: imageUrl } }
    );

    await db.disconnect();
    res.status(201).send({
      message: "Passport updated successfully",
      data: user,
    });
  } catch (error) {
    res
      .status(401)
      .send({ message: "There was an error updating the account passport" });
  }
};

export default handler;
