import nodemailer from "nodemailer";
const handler = async (req, res) => {
  const { fullName, subject, message } = req.body;
  const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.office365.com",
    auth: {
      user: process.env.NEXT_NODEMAILER_EMAIL,
      pass: process.env.NEXT_NODEMAILER_PASSWORD,
    },
    secure: true,
  });

  await transporter.sendMail({
    from: process.env.NEXT_NODEMAILER_EMAIL,
    to: process.env.NEXT_NODEMAILER_EMAIL,
    subject: subject,
    html: "<h1>Example HTML Message Body</h1>",
  });
};
export default handler;
