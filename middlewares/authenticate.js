import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { ctrlWrapper } from '../decorators/index.js';
import { ApiError } from '../helpers/index.js';
import User from '../models/user.js';

const { JWT_SECRET } = process.env;

const authenticateToken = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    throw ApiError(401);
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw ApiError(401);
    }
    req.user = user;
    next();
  } catch {
    throw ApiError(401);
  }
};

export default ctrlWrapper(authenticateToken);
