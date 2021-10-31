const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { updateProfile, getUserInfo } = require('../controllers/usersController');

//  Получаем данные пользователя
router.get('/me', getUserInfo);

//  Обновляем данные профиля
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

module.exports = router;
