import User from '../models/user.js';

export const addRefreshToken = async (user, refreshToken, userAgent) => {
  await User.updateOne({ _id: user._id }, { $pull: { tokens: { userAgent } } });

  await User.updateOne(
    { _id: user._id },
    {
      $push: {
        tokens: {
          $each: [{ refreshToken, userAgent, createdAt: new Date() }],
          $slice: -5,
        },
      },
    },
  );
};
