const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, loginUser } = require('../controllers/usersController');

// Роут для регистрации
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
}), createUser);

// Роут для логина
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
}), loginUser);

module.exports = router;
