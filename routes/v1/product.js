const express = require('express');
const { requireSignin, isUser, isAdmin } = require('../../controllers/auth.js');
const router = express.Router();

const { create } = require('../../controllers/product.js');
const { userById } = require('../../controllers/user.js');

router.post('/product/:userId', requireSignin, isUser, isAdmin, create);

router.param('userId', userById);

module.exports = router;
