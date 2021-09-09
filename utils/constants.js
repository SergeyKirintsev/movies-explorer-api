require('dotenv').config();

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/moviesdb',
  MONGO_OPTIONS = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  NODE_ENV = 'production',
  JWT_SECRET = 'secret-key',
  JWT_DEV = 'dev-key',
} = process.env;

module.exports = {
  PORT,
  MONGO_URL,
  MONGO_OPTIONS,
  NODE_ENV,
  JWT_SECRET,
  JWT_DEV,
};
