const express = require('express');
const router = express.Router();
const { create } = require('../../controllers/users');

router.post('/signup', create);

module.exports = router;
