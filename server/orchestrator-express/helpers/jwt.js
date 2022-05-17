const jwt = require('jsonwebtoken');

function signToken (payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}

function verifyToken (payload) {
  return jwt.verify(payload, process.env.JWT_SECRET);
}

module.exports = {
  signToken,
  verifyToken
}