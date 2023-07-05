const express = require('express');
const controller = require('../controllers/povrety-rate.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', auth(), controller.create);
router.put('/:id', auth(), controller.updateById);
router.delete('/:id', auth(), controller.deleteById);

module.exports = router;
