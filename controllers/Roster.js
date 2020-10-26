const Character = require('../models/Character');
const mongoose = require('mongoose');

exports.createCharacter = (req, res, next) => {
    console.log(req.body)
    const character = new Character({
        ...req.body
    });
    character.save()
        .then(character => res.status(201).json({
            message: 'Personnage enregistré !',
            character: character
        }))
        .catch(error => res.status(400).json({
            error
        }));
}

exports.createManyCharacters = (req, res, next) => {
    Character.insertMany(req.body)
        .then(() => res.status(201).json({ message: 'création ok' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllCharacters = (req, res, next) => {
    Character.find()
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json({
            error
        }))
}

exports.getOneCharacter = (req, res, next) => {
    Character.findOne({
        _id: req.params.id
    }).populate('game')
        .then(character => res.status(200).json(character))
        .catch(error => res.status(404).json({
            error
        }))
}

exports.getAllCharacterFromGame = (req, res, next) => {
    Character.find({
        'game': req.body.gameId
    })
        .populate("game")
        .then(characters => res.status(200).json({characters: characters, message: 'ok'}))
        .catch(error => res.status(400).json({
            error:error, message: 'nok'
        }))
}

exports.getCharactersByName = (req, res, next) => {
    Character.find({
        'name' : {$regex: req.params.id, $options: "i"}
    }).populate("game")
    .then(characters => 
        res.status(200).json(characters))
    .catch(error => res.status(404).json({error}))
}

exports.updateCharacter = (req, res, next) => {
    Character.updateOne({
        _id: req.params.id
    }, {
        ...req.body,
        _id: req.params.id
    })
        .then(() => res.status(200).json({
            message: 'Objet modifié !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
}

exports.deleteCharacter = (req, res, next) => {
    Character.deleteOne({
        _id: req.params.id
    })
        .then(() => res.status(200).json({
            message: 'Objet supprimé !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
}