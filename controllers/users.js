const debug = require('debug')('dev');
const consola = require('consola');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const { errorHandler } = require('../helper/dbErrorHandler');

//User signup
exports.signup = (req, res) => {
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

//User signin
exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (!user || err) {
      return res.status(400).json({ error: 'email not found' });
    }
    //Authenticate
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: 'incorrect password' });
    }

    const { _id, name, email, role } = user;

    //Create jwt token
    const token = jwt.sign({ _id }, process.env.JWT_SECRET);

    res.cookie('t', token, { expire: new Date() + 9999 });

    return res.status(200).json({ token, user: { _id, email, name, role } });
  });
};
//first check if email exists in db or not
//then check if email exists, does it match with password or not
//if password matches, create a jwt
//if password doesnt match, return a error message
