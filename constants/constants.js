const devJwt = '88005553535';
const codeOk = 200;
const codeCreated = 201;
const codeServerErr = 500;
const codeConflictingReq = 409;
const codeMongoServerError = 11000;
const mongoServerErrorMes = 'MongoServerError';
const codeNotFound = 404;
const mongoMovieDb = 'mongodb://localhost:27017/moviesdb';
const moviesNotFound = 'Фильмы не найдены!';
const movieNotFound = 'Фильм не найден!';
const wrongData = 'Неверные данные!';
const impossibleToDelete = 'Вы не можете удалить этот фильм!';
const succseccDelit = 'Фильм успешно удалён!';
const userNotFound = 'Пользователь не найден!';
const succseccRegistration = 'Вы успешно зарегистрировались!';
const wrongLogOrPass = 'Неправильные почта или пароль!';
const authErr = 'Ошибка авторизации!';
const serverErr = 'На сервере произошла ошибка!';
const sameEmail = 'Пользователь с таким email уже зарегистрирован!';
const invalidLink = 'Неправильная ссылка!';
const invalidEmail = 'Неправильный Email!';
const pageNotFound = 'Ресурс не найден!';
const rateLimiterMessage = 'Слишком много запросов с одного IP, пожалуйста повторите запрос через 15 минут';

module.exports = {
  devJwt,
  codeOk,
  codeCreated,
  codeServerErr,
  codeConflictingReq,
  codeMongoServerError,
  codeNotFound,
  mongoMovieDb,
  movieNotFound,
  moviesNotFound,
  wrongData,
  impossibleToDelete,
  succseccDelit,
  userNotFound,
  succseccRegistration,
  wrongLogOrPass,
  authErr,
  serverErr,
  sameEmail,
  mongoServerErrorMes,
  invalidLink,
  invalidEmail,
  pageNotFound,
  rateLimiterMessage,
};
