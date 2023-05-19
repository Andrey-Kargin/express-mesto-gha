const usersRouter = require('express').Router();

const {
  updateUserValidation,
  updateAvatarValidation,
  userIdValidation,
} = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getUser);
usersRouter.get('/users/:userId', userIdValidation, getUserById);
usersRouter.patch('/users/me', updateUserValidation, updateUser);
usersRouter.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = usersRouter;
