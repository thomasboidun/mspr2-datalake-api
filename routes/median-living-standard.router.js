const express = require('express');
const controller = require('../controllers/median-living-standard.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', controller.getAll);
router.post('/', auth(), controller.create);
router.put('/', auth(), controller.update);
router.delete('/', auth(), controller.delete);

module.exports = router;
