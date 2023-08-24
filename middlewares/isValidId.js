import { isValidObjectId } from "mongoose";
import { ApiError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(ApiError(400, `${id} is not valid id`));
  }
  next();
};
export default isValidId;
