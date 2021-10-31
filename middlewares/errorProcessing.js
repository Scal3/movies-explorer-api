const {
  codeServerErr,
  codeConflictingReq,
  codeMongoServerError,
  serverErr,
  sameEmail,
  mongoServerErrorMes,
} = require('../constants/constants');

//  Централизованная обработка ошибок
const errorProcessing = ((err, req, res, next) => {
  const { statusCode = codeServerErr, message } = err;
  if (err.name === mongoServerErrorMes && err.code === codeMongoServerError) {
    res.status(codeConflictingReq).send({ message: sameEmail });
  }
  res.status(statusCode)
    .send({
      message: statusCode === codeServerErr
        ? serverErr
        : message,
    });
  next();
});

module.exports = errorProcessing;
