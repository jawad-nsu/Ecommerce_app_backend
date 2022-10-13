const { errorHandler } = require('../helper/dbErrorHandler');
const Catagory = require('../models/category');

exports.create = (req, res) => {
  const category = new Catagory(req.body);
  category.save((err, data) => {
    if (err) {
      res.status(400).json({ error: errorHandler(err) });
    }
  });
};
