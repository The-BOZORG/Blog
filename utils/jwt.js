import jwt from 'jsonwebtoken';

const createAccessJWT = (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_ACCESS_TOKEN,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES,
    },
  );

  return token;
};

const createRefreshJWT = (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_REFRESH_TOKEN,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    },
  );

  return token;
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
};

export {
  createAccessJWT,
  createRefreshJWT,
  verifyAccessToken,
  verifyRefreshToken,
};
