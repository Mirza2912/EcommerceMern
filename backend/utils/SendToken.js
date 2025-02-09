/* Code for generating token */
const createAccessToken = async (user, statusCode, res) => {
  const accessToken = user.generateAccessToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.ACCESS_TOKEN_EXPIRY * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("accessToken", accessToken, options).json({
    success: true,
    user,
    accessToken,
  });
};

export { createAccessToken };
