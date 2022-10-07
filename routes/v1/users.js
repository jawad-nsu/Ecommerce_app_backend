const express = require('express');
const router = express.Router();
const { create } = require('../../controllers/users');
const { signup } = require('../../validator/index');

router.post('/signup', signup, create);

module.exports = router;
