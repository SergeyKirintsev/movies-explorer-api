require('dotenv').config();

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
const COOKIE_KEY = 'jwt';
const COOKIE_OPTIONS = {
  maxAge: 3600000 * 24 * 7,
  httpOnly: true,
};

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/moviesdb',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-key';

module.exports = {
  PORT,
  MONGO_URL,
  MONGO_OPTIONS,
  SECRET_KEY,
  COOKIE_KEY,
  COOKIE_OPTIONS,
};
