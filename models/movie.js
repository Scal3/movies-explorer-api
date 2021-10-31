const mongoose = require('mongoose');
const validator = require('validator');

const { invalidLink } = require('../constants/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value, { require_protocol: true });
      },
      message: invalidLink,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value, { require_protocol: true });
      },
      message: invalidLink,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value, { require_protocol: true });
      },
      message: invalidLink,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

const model = mongoose.model('movie', movieSchema);
module.exports = model;
