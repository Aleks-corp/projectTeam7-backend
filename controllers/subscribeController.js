import { ctrlWrapper } from "../decorators/index.js";
import { sendMail } from "../helpers/index.js";
import "dotenv/config";

const { EMAIL_SEND_FROM } = process.env;

const subscribe = async (req, res) => {
  const { email } = req.body;
  const msg = {
    to: email,
    from: EMAIL_SEND_FROM,
    subject: "Subscription successfull",
    text: "Your have subscribe to our newsletter",
    html: `<h2>Your have subscribe to newsletter and new recipes in Drunk Master</h2>`,
  };
  await sendMail(msg);

  res.status(201).json({ message: "subscription successfull" });
};

export default {
  subscribe: ctrlWrapper(subscribe),
};
