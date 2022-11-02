const express = require('express');
const { requireSignin, isUser, isAdmin } = require('../../controllers/auth.js');
const router = express.Router();

const {
  create,
  read,
  productById,
  remove,
} = require('../../controllers/product.js');
const { userById } = require('../../controllers/user.js');

router.post('/product/:userId', requireSignin, isUser, isAdmin, create);
router.get('/product/:productId', read);
router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isUser,
  isAdmin,
  remove
);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
