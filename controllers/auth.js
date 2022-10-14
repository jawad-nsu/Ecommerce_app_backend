const debug = require('debug')('dev');
const consola = require('consola');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');

const User = require('../models/user');
const { errorHandler } = require('../helper/dbErrorHandler');

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

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Sign out successful' });
};

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth',
});

exports.isUser = (req, res, next) => {
  let user = req.auth && req.profile && req.auth._id == req.profile._id;
  if (!user) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role !== 1) {
    res.status(403).json({ error: 'Admin resource. Access denied' });
  }
  next();
};
