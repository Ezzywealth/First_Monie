import bcryptjs from "bcryptjs";
import User from "../../../components/Models/User";
import db from "../../../utils/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const {
    email,
    password,
    name,
    country,
    userName,
    telephone,
    birthday,
    sex,
    marital_status,
    occupation,
    address,
    account_number,
    secret_code,
  } = req.body;
  if (
    !userName ||
    !telephone ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }

  await db.connect();

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "This email is already in use" });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    name,
    country,
    telephone,
    userName,
    email,
    password,
    isAdmin: false,
    telephone,
    birthday,
    sex,
    marital_status,
    occupation,
    address,
    account_number,
    secret_code,
  });

  const user = await newUser.save();

  await db.disconnect();
  res.status(201).send({
    message: "User created successfully!",
  });
}

export default handler;
