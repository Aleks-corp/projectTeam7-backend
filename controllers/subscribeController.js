import { ctrlWrapper } from "../decorators/index.js";

const subscribe = async (req, res) => {
  //   const { email } = req.body;

  // відправити лист на почту який прийшов у реквесті з підтвердженням на підписку
  res.status(201).json({ message: "subscription successfull" });
};

export default {
  subscribe: ctrlWrapper(subscribe),
};
