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
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validateCreateUser,
  validationLogin,
};
