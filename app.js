const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const auth = require('./middlewares/auth');
const errorProcessing = require('./middlewares/errorProcessing');
const indexRouter = require('./routes/index');
const regAndLogRouter = require('./routes/regAndLog');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  codeNotFound,
  mongoMovieDb,
  pageNotFound,
  rateLimiterMessage,
} = require('./constants/constants');

const { PORT = 3000, NODE_ENV, MONGODB } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: rateLimiterMessage,
});

// Ограничитель запросов в секунду
app.use(limiter);

app.use(helmet());

// Парсеры
app.use(bodyParser.json());

// Логер запросов
app.use(requestLogger);

// Роуты регистрации и логина
app.use(regAndLogRouter);

// Роуты пользователя и фильмов
app.use(auth, indexRouter);

// Ошибка, при обращении к несуществующему роуту
app.use('*', (req, res, next) => {
  res.status(codeNotFound).send({ message: pageNotFound });
  next();
});

// Логер ошибок
app.use(errorLogger);

app.use(errors());

// Централизованная обработка ошибок
app.use(errorProcessing);

// Подключаем БД
mongoose.connect(NODE_ENV === 'production' ? MONGODB : mongoMovieDb);

app.listen(PORT, () => {
  console.log(`Strated on ${PORT} port`);
});
