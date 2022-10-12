const express = require('express');
const { requireSignin, isUser } = require('../../controllers/auth');
const router = express.Router();
const { userById } = require('../../controllers/user');

const {} = '../../controllers/user';

router.get('/secret/:userId', requireSignin, isUser, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.param('userId', userById);

module.exports = router;
