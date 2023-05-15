const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUserById);
usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', updateUser);
usersRouter.patch('/users/me/avatar', updateAvatar);

usersRouter.use('/*', (req, res) => {
  res.status(404).send({ message: '404: Not Found' });
});

module.exports = usersRouter;
