const express = require('express');
const router = express.Router();
const { signup } = require('../../controllers/users');
const { signin } = require('../../controllers/users');
const { userSignupValidator } = require('../../validator/index');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);

module.exports = router;
