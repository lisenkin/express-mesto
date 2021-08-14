const NotFoundErr = require('../errors/NotFoundErr');

module.exports.notFound = (req, res, next) => {
  next(new NotFoundErr('Страница не найдена'));
};
