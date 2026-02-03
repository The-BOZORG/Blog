import ErrorResponse from '../errors/customError.js';
import { verifyAccessToken } from '../utils/jwt.js';

const authenticateUser = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('not auth to access this route', 401));
  }

  try {
    const { username, userId, role, email } = verifyAccessToken(token);
    req.user = { username, userId, role, email };
    next();
  } catch (err) {
    return next(new ErrorResponse('token is not valid', 401));
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ErrorResponse('unauthorized to access this route', 401);
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
