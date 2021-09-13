const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError } = require('../errors/not-found-err');
const { CastError } = require('../errors/cast-err');
const { ExistFieldError } = require('../errors/exist-field-err');
const { ValidationError } = require('../errors/validation-err');
const {
  SECRET_KEY,
  COOKIE_KEY,
  COOKIE_OPTIONS,
} = require('../utils/constants');

const signOut = (req, res) => res.clearCookie(COOKIE_KEY).send({ message: 'Куки удалены' });

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );
      res
        .cookie(COOKIE_KEY, token, COOKIE_OPTIONS)
        .send({ data: user.toJSON() });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({ data: user.toJSON() }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные при создании пользователя'));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ExistFieldError('Email уже существует'));
      }
      return next(err);
    });
};

const getMe = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => next(new NotFoundError('Пользователь по указанному _id не найден')))
    .then(({ name, email }) => res.send({ data: { email, name } }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Невалидный id пользователя'));
      }
      return next(err);
    });
};

const updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .orFail(() => next(new NotFoundError('Пользователь по указанному _id не найден')))
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Невалидный id пользователя'));
      }
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные для обновления профиля'));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ExistFieldError('Email уже существует'));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  login,
  signOut,
  getMe,
  updateProfile,
};
