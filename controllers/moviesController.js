const Movie = require('../models/movie');

const {
  codeOk,
  codeCreated,
  moviesNotFound,
  movieNotFound,
  wrongData,
  impossibleToDelete,
  succseccDelit,
} = require('../constants/constants');
const BadReqError = require('../errors/bad-req-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

//  Получаем список всех фильмов
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      if (!movies || movies.length === 0) {
        throw new NotFoundError(moviesNotFound);
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
    nameEN, thumbnail, movieId,
  } = req.body;
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
    movieId,
  })
    .then((movie) => {
      if (!movie) {
        throw new BadReqError(wrongData);
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
      if (!movie) {
        throw new NotFoundError(movieNotFound);
      }

      const movieOwner = String(movie.owner);

      if (movieOwner !== owner) {
        throw new ForbiddenError(impossibleToDelete);
      }

      movie.remove()
        .then(() => {
          res.status(codeOk).send({ message: succseccDelit });
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
