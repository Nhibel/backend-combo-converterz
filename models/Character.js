const mongoose = require('mongoose');

// Get the Schema constructor
var Schema = mongoose.Schema;

const CharacterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: "Game"
    }
})

module.exports = mongoose.model('Character', CharacterSchema);