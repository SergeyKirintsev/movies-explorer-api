const { celebrate, Joi } = require('celebrate');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Невалидный email')
      .messages({
        'any.required': 'Поле email обязательное',
      }),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Невалидный email')
      .messages({
        'any.required': 'Поле email обязательное',
      }),
    password: Joi.string().required(),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Невалидный email')
      .messages({
        'any.required': 'Поле email обязательное',
      }),
    name: Joi.string().required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().min(1),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailer: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    movieId: Joi.number().integer().min(1),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    owner: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  validateCreateUser,
  validationLogin,
  validateUpdateProfile,
  validateCreateMovie,
};
