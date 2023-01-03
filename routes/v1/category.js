const express = require('express');
const router = express.Router();
const { requireSignin, isUser, isAdmin } = require('../../controllers/auth');
const {
  create,
  categoryById,
  read,
  lists,
  update,
  remove,
} = require('../../controllers/category');
const { userById } = require('../../controllers/user');

router.post('/category/create/:userId', requireSignin, isUser, isAdmin, create);
router.get('/category/:categoryId', read);
router.get('/categories', lists);
router.put('/category/:categoryId', requireSignin, isUser, isAdmin, update);
router.delete('/category/:categoryId', requireSignin, isUser, isAdmin, remove);

router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;
