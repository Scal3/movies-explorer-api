require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const { devJwt, wrongLogOrPass, authErr } = require('../constants/constants');

const tokenVerify = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(authErr);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devJwt);
  } catch (err) {
    if (err) {
      throw new UnauthorizedError(wrongLogOrPass);
    }

    next(err);
  }

  req.user = payload;

  next();
};

module.exports = tokenVerify;
