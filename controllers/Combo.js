/** @format */

const Combo = require('../models/Combo');

exports.createCombo = (req, res, next) => {
  let userId = req.user.userId;
  let characterId = req.body.character;
  let manipulation = req.body.manipulation;
  let youtubeId = req.body.youtubeId;
  let youtubeTimeStamp = req.body.youtubeTimeStamp;
  let date = new Date().getTime();

  const combo = new Combo({
    character: characterId,
    user: userId,
    manipulation: manipulation,
    youtubeId: youtubeId,
    youtubeTimeStamp: youtubeTimeStamp,
    date: date,
  });
  combo
    .save()
    .then((combo) => res.status(200).json({ message: 'ok', combo: combo }))
    .catch((error) =>
      res.status(400).json({
        message: 'nok',
        error,
      })
    );
};

exports.getAllCombosForUserCharacter = (req, res, next) => {
  let userId = req.user.userId;
  let characterId = req.body.characterId;
  Combo.find({
    user: userId,
    character: characterId,
  })
    .populate('character')
    .populate('user')
    .then((combo) => res.status(200).json({ combo }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyCombo = (req, res, next) => {
  Combo.updateOne({ _id: req.params.id}, {...req.body, _id: req.params.id})
  .then(() => res.status(200).json({message: 'ok'}))
  .catch(error => res.status(400).json({error: error, message: 'nok'}))
}

exports.deleteCombo = (req, res, next) => {
  Combo.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Combo supprimé' }))
    .catch((error) => res.status(400).json({ error }));
};
