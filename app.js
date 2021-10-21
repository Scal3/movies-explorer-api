const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const routes = require('./routes');
const auth = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, loginUser } = require('./controllers/usersController');

const { PORT = 3000 } = process.env;
const app = express();

// Парсеры
app.use(bodyParser.json());

// Логер запросов
app.use(requestLogger);

// Роут для регистрации
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
}), createUser);

// Роут для логина
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
}), loginUser);

// Проверка токена для роутов снизу
app.use(auth);

// Все роуты
app.use(routes);

// Логер ошибок
app.use(errorLogger);

app.use(errors());

// Ошибка, при обращении к несуществующему роуту
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Ресурс не найден!' });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'MongoServerError' && err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с таким email уже зарегистрирован!' });
  }
  if (err.name === 'TypeError' && err.message === "Cannot read property 'owner' of null") {
    res.status(404).send({ message: 'Фильм не найден!' });
  }
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.listen(PORT, () => {
  console.log(`Strated on ${PORT} port`);
});
