/** @format */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const comboCtrl = require('../controllers/Combo');

router.post('/', auth, comboCtrl.createCombo);
router.post('/characterCombos', auth, comboCtrl.getAllCombosForUserCharacter);
router.delete('/:id', auth, comboCtrl.deleteCombo);
router.put('/:id', auth, comboCtrl.modifyCombo);

module.exports = router;
