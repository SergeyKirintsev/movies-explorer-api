require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rate-limit');
const errorsHandler = require('./middlewares/errorsHandler');
const router = require('./routes');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();
// app.set('trust proxy', 1); // Enable if you're behind a reverse proxy
app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors);
app.use(router);
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(errorsHandler);
app.listen(PORT);
