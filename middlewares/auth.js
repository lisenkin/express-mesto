const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/UnauthorizedErr');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie) {
    throw new UnauthorizedErr('Авторизуйтесь');
  }
  const token = cookie.replace('jwt=', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedErr('Авторизуйтесь');
  }
  req.user = payload;
  next();
};
