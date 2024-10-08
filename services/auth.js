const jwt = require("jsonwebtoken");
const secretKey = "Shashank@08052002#";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = jwt.sign(payload, secretKey);
  return token;
}

function validateToken(token) {
  if (!token) return null;
  const payload = jwt.verify(token, secretKey);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
