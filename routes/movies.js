const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
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
      image: Joi.string().required()
        .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/\/=]*)/m),
      trailer: Joi.string().required()
        .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/\/=]*)/m),
      thumbnail: Joi.string().required()
        .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/\/=]*)/m),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }), createFilm);

//  Удаляем фильм
router.delete('/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).regex(/[A-F0-9]/i),
    }),
  }), deleteFilm);

module.exports = router;
