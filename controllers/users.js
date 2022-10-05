const User = require('../models/users');

//USER SIGNUP
exports.create = (req, res) => {
  console.log('req.body', req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error,
      });
    }
    res.json({
      user,
    });
  });
};
