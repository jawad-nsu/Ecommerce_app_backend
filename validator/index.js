exports.signup = (req, res) => {
  req.check('name', 'Name is required').notEmpty();
  req.check('email', 'email must be between 3 to 32 characters').matches('//');
};
