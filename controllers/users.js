const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Не корректные данные' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res
        .status(500)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы не валидные данные' });
      }
      return res
        .status(500)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUser = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      }
      return res
        .status(500)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const owner = req.user._id;
  const avatar = req.body;

  User.findByIdAndUpdate(owner, avatar, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      }
      return res
        .status(500)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
