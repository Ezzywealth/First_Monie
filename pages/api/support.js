import nodemailer from "nodemailer";
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Unauthorized method" });
  }
  const { name, email, phone, subject, message } = req.body;

  const user = {
    user: process.env.NEXT_NODEMAILER_EMAIL,
    pass: process.env.NEXT_NODEMAILER_PASSWORD,
  };

  const transporter = nodemailer.createTransport({
    port: 587,
    service: "Outlook365",
    auth: {
      user: process.env.NEXT_NODEMAILER_EMAIL,
      pass: process.env.NEXT_NODEMAILER_PASSWORD,
    },
    secureConnection: false,
  });

  const mailData = {
    from: process.env.NEXT_NODEMAILER_EMAIL,
    to: process.env.NEXT_NODEMAILER_EMAIL,
    subject: `Message From ${name}`,
    text: message + " | Sent from: " + email,
    html: `<div>${message}</div><p>Sent from:
    ${email}</p>`,
  };

  try {
    await transporter.sendMail(mailData);
    res.status(201).send({ message: "Message sent successfully" });
  } catch (error) {
    res
      .status(401)
      .send({ message: "There was an error, try again!!!.", data: user });
  }
};
export default handler;
