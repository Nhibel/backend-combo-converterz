const Game = require('../models/Game');

exports.createGame = (req, res, next) => {
    const game = new Game({
        ...req.body
    })
    game.save()
        .then(game => res.status(201).json({
            message: 'Jeu enregistré',
            game: game
        }))
        .catch(error => res.status(400).json({
            error
        }))
}

exports.getGames = (req, res, next) => {
    Game.find()
        .then(games => res.status(200).json(games))
        .catch(error => res.status(400).json({
            error
        }))
}

exports.getOneGame = (req, res, next) => {
    Game.findOne({
            _id: req.params.id
        })
        .then(game => res.status(200).json(game))
        .catch(error => res.status(400).json({
            error
        }))
}

exports.updateGame = (req, res, next) => {
    Game.updateOne({
            _id: req.params.id
        }, {
            ...req.body,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Objet modifié'
        }))
        .catch(error => res.status(400).json({
            error
        }))
}

exports.deleteGame = (req, res, next) => {
    Game.deleteOne({
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Objet supprimé'
        }))
        .catch(error => res.status(400).json({
            error
        }))
}