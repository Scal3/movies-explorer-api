const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getMovies,
  deleteFilm,
  createFilm,
} = require('../controllers/moviesController');

//  Получаем список фильмов
router.get('/', getMovies);

//  Создаём фильм
router.post('/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom((value, helpers) => {
        if (validator.isUrl(value)) {
          return value;
        }
        return helpers.message('Поле imege заполненно некоректно!');
      }),
      trailer: Joi.string().required().custom((value, helpers) => {
        if (validator.isUrl(value)) {
          return value;
        }
        return helpers.message('Поле trailer заполненно некоректно!');
      }),
      thumbnail: Joi.string().required().custom((value, helpers) => {
        if (validator.isUrl(value)) {
          return value;
        }
        return helpers.message('Поле thumbnail заполненно некоректно!');
      }),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.number().required(),
    }),
  }), createFilm);

//  Удаляем фильм
router.delete('/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }), deleteFilm);

module.exports = router;
