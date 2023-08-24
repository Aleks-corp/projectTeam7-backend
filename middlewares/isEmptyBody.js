import { ApiError } from '../helpers/index.js';

const isEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    next(ApiError(400, 'Missing fields'));
  }
  next();
};

export default isEmptyBody;
