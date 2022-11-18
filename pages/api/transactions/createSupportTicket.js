import Support from "../../../components/Models/Support";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(401).send({ message: "Unauthorized method" });
  }
  const { fullName, message, subject } = req.body;

  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const createdDate = new Date().toLocaleString("en-US", options);

  const newSupport = {
    fullName,
    message,
    subject,
    date: createdDate,
  };

  try {
    await db.connect();
    await Support.saveOne(newSupport);
    await db.disconnect();
    res.status(201).send({
      message: "Your Message has been sent to support, and been reviewed",
    });
  } catch (error) {
    res.status(401).send({
      message: "Support ticket could not be created, try again later",
      data: newSupport,
    });
  }
};
export default handler;
