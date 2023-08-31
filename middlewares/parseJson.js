import { ApiError } from "../helpers/index.js";

const parseJson = (req, res, next) => {
  try {
    req.body = JSON.parse(req.body.data);
  } catch (error) {
    next(ApiError(400, `Can't parse data, please stringify all to data`));
  }
  next();
};
export default parseJson;
