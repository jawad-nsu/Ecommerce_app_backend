const express = require('express');
const router = express.Router();
const { requireSignin, isUser, isAdmin } = require('../../controllers/auth');
const { create } = require('../../controllers/category');
const { userById } = require('../../controllers/user');

router.post('/category/create/:userId', requireSignin, isUser, isAdmin, create);

router.param('userId', userById);

module.exports = router;
