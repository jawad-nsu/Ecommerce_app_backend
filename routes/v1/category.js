const express = require('express');
const { requireSignin, isUser, isAdmin } = require('../../controllers/auth');
const { create } = require('../../controllers/category');
const { userById } = require('../../controllers/user');
const router = express.Router();

router.post('/category/create/:userId', requireSignin, isUser, isAdmin, create);

router.param('userId', userById);

module.exports = router;
