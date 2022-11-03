const express = require('express');
const router = express.Router();
const { requireSignin, isUser, isAdmin } = require('../../controllers/auth');
const { create, categoryById, read } = require('../../controllers/category');
const { userById } = require('../../controllers/user');

router.post('/category/create/:userId', requireSignin, isUser, isAdmin, create);
router.get('/category/:categoryId', read);

router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;
