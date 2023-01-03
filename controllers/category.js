const { errorHandler } = require('../helper/dbErrorHandler');
const Category = require('../models/category');

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  res.status(200).json(req.category);
};

exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.lists = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      res.status(400).json({
        error: errorHandler(err),
      });
    }
    return res.json(data);
  });
};

exports.remove = (req, res) => {
  const category = req.category;
  category.delete((err, data) => {
    if (err) {
      res.status(400).json({
        error: errorHandler(err),
      });
      res.json('Category deleted');
    }
  });
};

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: 'Category not found!',
      });
    }
    req.category = category;
    next();
  });
};
