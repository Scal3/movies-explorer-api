const Movie = require('../models/movie');

const codeOk = 200;
const codeCreated = 201;
const BadReqError = require('../errors/bad-req-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

//  Получаем список всех фильмов
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      if (!movies || movies.length === 0) {
        throw new NotFoundError('Фильмы не найдены!');
      } else {
        res.status(codeOk).send({ movies });
      }
    })
    .catch(next);
};

//  Создаём фильм
const createFilm = (req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailer, nameRU,
    nameEN, thumbnail, movieId } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    owner,
    thumbnail,
    movieId })
    .then((movie) => {
      if (!movie) {
        throw new BadReqError('Неверные данные!');
      }
      res.status(codeCreated).send({ movie });
    })
    .catch(next);
};

//  Удаляем фильм по id
const deleteFilm = (req, res, next) => {
  const { id } = req.params;
  const owner = req.user._id;
  Movie.findById(id)
    .then((movie) => {
      const movieOwner = JSON.stringify(movie.owner).replace(/\"/g, '');
      if (!movie) {
        throw new NotFoundError('Фильм не найден!');
      }
      if (movieOwner !== owner) {
        throw new ForbiddenError('Вы не можете удалить этот фильм!');
      }
      Movie.findByIdAndRemove(id)
        .then((movieForDel) => {
          if (!movieForDel) {
            throw new NotFoundError('Фильм не найден!');
          }
          res.status(codeOk).send({ message: 'Фильм успешно удалён!' });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  deleteFilm,
  createFilm,
};
