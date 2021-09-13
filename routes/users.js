const userRouter = require('express').Router();
const { getMe, updateProfile } = require('../controllers/users');
const { validateUpdateProfile } = require('../middlewares/validations');

userRouter.get('/me', getMe);
userRouter.patch('/me', validateUpdateProfile, updateProfile);

module.exports = { userRouter };
