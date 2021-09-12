const Movie = require('../models/movie');
const { ValidationError } = require('../errors/validation-err');
const { NotFoundError } = require('../errors/not-found-err');
const { CastError } = require('../errors/cast-err');
const { ForbiddenError } = require('../errors/forbidden-err');

const getMovies = (req, res, next) => {
  const currentUser = req.user._id;
  Movie.find({ owner: currentUser })
    .then((data) => res.send({ data }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    owner: req.user._id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(err.message));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const currentUser = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => next(new NotFoundError('Фильм с указанным _id не найден')))
    .then((card) => {
      if (!card.owner.equals(currentUser)) {
        next(new ForbiddenError('Вы не имеет права удалить этот фильм'));
      } else {
        Movie.findByIdAndRemove(movieId)
          .then((data) => res.send({
            data,
            message: 'Запись удалена',
          }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Передан невалидный _id для удаления фильма'));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
