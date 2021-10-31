const mongoose = require('mongoose');
const validator = require('validator');

const { invalidEmail } = require('../constants/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value, { require_protocol: true });
      },
      message: invalidEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

const model = mongoose.model('user', userSchema);
module.exports = model;
