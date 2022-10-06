const debug = require('debug')('dev');
const consola = require('consola');

const User = require('../models/users');
const { errorHandler } = require('../helper/dbErrorHandler');

//USER SIGNUP
exports.create = (req, res) => {
  consola.info('req.body', req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    const { name, email, createdAt } = user;
    res.json({
      name,
      email,
      createdAt,
    });
  });
};
