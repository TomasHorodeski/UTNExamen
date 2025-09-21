const jwt = require('jsonwebtoken');
const { env } = require('../config/env');

function signToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '12h' });
}

module.exports = { signToken };
