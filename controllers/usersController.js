const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  codeOk,
  codeCreated,
  userNotFound,
  wrongLogOrPass,
  succseccRegistration,
  wrongData,
  devJwt,
} = require('../constants/constants');
const NotFoundError = require('../errors/not-found-err');
const BadReqError = require('../errors/bad-req-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

//  Получаем инфу о пользователе
const getUserInfo = (req, res, next) => {
  const owner = req.user._id;
  User.findById(owner)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFound);
      } else {
        res.status(codeOk)
          .send({ email: user.email, name: user.name, id: owner });
      }
    })
    .catch(next);
};

//  Обновляем профиль
const updateProfile = (req, res, next) => {
  const owner = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(owner, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFound);
      } else {
        res.status(codeOk).send({ data: user });
      }
    })
    .catch(next);
};

//  Регистрация
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash })
        .then((user) => {
          if (!user) {
            throw new BadReqError(wrongData);
          }

          res.status(codeCreated).send({ message: succseccRegistration });
        })

        .catch(next);
    })

    .catch(next);
};

//  Логин
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(wrongLogOrPass);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(wrongLogOrPass);
          }
          const token = jwt.sign({ _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : devJwt, { expiresIn: '7d' });
          res.status(codeOk).send({ token });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  updateProfile,
  getUserInfo,
  createUser,
  loginUser,
};
