/** @format */

const mongoose = require('mongoose');

// Get the Schema constructor
var Schema = mongoose.Schema;

const ComboSchema = mongoose.Schema({
  character: {
    type: Schema.Types.ObjectId,
    ref: 'Character',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  manipulation: {
    type: String,
    required: true,
  },
  youtubeId: {
    type: String,
    required: false,
  },
  youtubeTimeStamp: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Combo', ComboSchema);
