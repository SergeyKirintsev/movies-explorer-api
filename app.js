require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rate-limit');

const errorsHandler = require('./middlewares/errorsHandler');
const { NotFoundError } = require('./errors/not-found-err');

const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();
// app.set('trust proxy', 1); // Enable if you're behind a reverse proxy

app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors);

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use(errorsHandler);

app.listen(PORT);
