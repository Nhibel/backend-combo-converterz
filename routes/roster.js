const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const rosterCtrl = require('../controllers/Roster')

router.get("/", auth, rosterCtrl.getAllCharacters);
router.get("/:id", auth, rosterCtrl.getOneCharacter);
router.get("/search/:id", auth, rosterCtrl.getCharactersByName)
router.post("/charactersFromGame", auth, rosterCtrl.getAllCharacterFromGame);
router.post('/insert-many', auth, rosterCtrl.createManyCharacters);
router.post('/', auth, rosterCtrl.createCharacter);
router.put('/:id', auth, rosterCtrl.updateCharacter);
router.delete('/:id', auth, rosterCtrl.deleteCharacter);

module.exports = router;