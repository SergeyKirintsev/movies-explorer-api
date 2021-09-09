const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { NotFoundError } = require('../errors/not-found-err');
const { validateCreateUser, validationLogin } = require('../middlewares/validations');

router.post('/signup', validateCreateUser, createUser);

router.post('/signin', validationLogin, login);

router.use(auth);

router.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
