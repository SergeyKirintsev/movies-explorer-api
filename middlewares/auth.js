const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/auth-err');
const { SECRET_KEY, COOKIE_KEY } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies[COOKIE_KEY];

  if (!token) {
    throw new AuthError('Нет токена');
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload; // записываем пейлоуд в объект запроса
  } catch (err) {
    throw new AuthError('Ошибка верификации токена');
  }

  next(); // пропускаем запрос дальше
};
