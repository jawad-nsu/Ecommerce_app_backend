const express = require('express');
const { requireSignin, isUser, isAdmin } = require('../../controllers/auth');
const router = express.Router();
const { userById } = require('../../controllers/user');

router.get('/secret/:userId', requireSignin, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.param('userId', userById);

module.exports = router;
