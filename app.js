require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const {
  createUserValidation,
  loginValidation,
} = require('./middlewares/validation');

const auth = require('./middlewares/auth');

const {
  login,
  createUser,
} = require('./controllers/users');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(MONGO_URL);

const app = express();
app.use(express.json());

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use(usersRouter);
app.use(cardsRouter);

app.use(errors());

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({
    message: status === 500 ? 'Ошибка сервера' : message,
  });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
