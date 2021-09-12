const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/auth-err');
const { SECRET_KEY, COOKIE_KEY } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies[COOKIE_KEY];

  if (!token) {
    return next(new AuthError('Необходима авторизация!'));
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload; // записываем пейлоуд в объект запроса
  } catch (err) {
    return next(new AuthError('Ошибка верификации токена'));
  }

  return next(); // пропускаем запрос дальше
};
