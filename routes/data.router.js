const express = require('express');
const controller = require('../controllers/data.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', controller.getAll);

module.exports = router;
