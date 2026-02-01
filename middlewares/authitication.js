import ErrorResponse from '../errors/customError.js';
import { verifyAccessToken } from '../utils/jwt.js';

const authenticateUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ErrorResponse('not auth to access this route', 401);
  }

  try {
    const { username, userId, role, email } = await verifyAccessToken({
      token,
    });
    req.user = { username, userId, role, email };
    next();
  } catch (err) {
    throw new next(new ErrorResponse('token is not valid', 401));
  }
};

export default authenticateUser;
