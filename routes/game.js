const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const gameCtrl = require('../controllers/Game')

router.get("/", auth, gameCtrl.getGames);
router.get("/:id", auth, gameCtrl.getOneGame);
router.post("/", auth, gameCtrl.createGame);
router.put("/:id", auth, gameCtrl.updateGame);
router.delete("/:id", auth, gameCtrl.deleteGame);

module.exports = router;