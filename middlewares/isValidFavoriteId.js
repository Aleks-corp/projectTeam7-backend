import { isValidObjectId } from "mongoose";
import { ApiError } from "../helpers/index.js";

const isValidFavoriteId = (req, res, next) => {
  const { id } = req.body;
  if (!isValidObjectId(id)) {
    next(ApiError(400, `${id} is not valid id`));
  }
  next();
};
export default isValidFavoriteId;
