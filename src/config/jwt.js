const jwt = require("jsonwebtoken");

exports.signToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      prodi: user.prodi,
      unit: user.unit,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};
