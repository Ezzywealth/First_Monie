import { getSession } from "next-auth/react";
import bcryptjs from "bcryptjs";
import User from "../../../components/Models/User";
import db from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "signin required" });
  }

  const { user } = session;
  const {
    selectedCountry,
    fullName,
    email,
    userName,
    telephone,
    password,
    occupation,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !email.includes("@") ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }

  await db.connect();
  const toUpdateUser = await User.findById(user._id);
  toUpdateUser.name = fullName;
  toUpdateUser.email = email;
  toUpdateUser.telephone = telephone;
  toUpdateUser.country = selectedCountry;
  toUpdateUser.occupation = occupation;
  toUpdateUser.userName = userName;

  if (password) {
    toUpdateUser.password = bcryptjs.hashSync(password);
  }

  await toUpdateUser.save();
  await db.disconnect();
  res.status(201).send({
    message: "User updated",
    toUpdateUser,
  });
  try {
  } catch (error) {
    res.status(401).send({
      message: "Profile could not be updated, try again later",
    });
  }
}

export default handler;
