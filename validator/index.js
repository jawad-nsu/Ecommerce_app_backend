exports.userSignupValidator = (req, res, next) => {
  req.check('name', 'Name is required').notEmpty();
  // req
  //   .check('email', 'email must be between 3 to 32 characters')
  //   .matches(/.+\@.+\..+/)
  //   .withMessage('Email must contain @')
  //   .isLength({
  //     min: 4,
  //     max: 32,
  //   });

  req.check('email', 'Email is required').notEmpty();
  req
    .check('email')
    .isLength({ min: 4, max: 32 })
    .withMessage('Email must be between 4 - 32')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @');

  req.check('password', 'Password is required').notEmpty();
  req
    .check('password')
    .isLength({ min: 6 })
    .withMessage('password must be 6 characters in length')
    .matches(/\d/)
    .withMessage('password must contain at least a number');

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
