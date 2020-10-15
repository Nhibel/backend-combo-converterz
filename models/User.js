/** @format */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Get the Schema constructor
var Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Number,
    required: true,
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
  },
});

UserSchema.plugin(uniqueValidator, {
  message: 'Il existe déjà un utilisateur avec ce/cet {PATH}',
});

module.exports = mongoose.model('User', UserSchema);
