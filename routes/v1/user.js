const express = require('express');
const { requireSignin, isUser, isAdmin } = require('../../controllers/auth');
const router = express.Router();
const { userById, read, update } = require('../../controllers/user');

router.get('/secret/:userId', requireSignin, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get('/user/:userId', requireSignin, isUser, read);
router.put('/user/:userId', requireSignin, isUser, update);

router.param('userId', userById);

module.exports = router;
