const Product = require('../models/product.js');
const _ = require('lodash');
const fs = require('fs');
const formidable = require('formidable');
const { errorHandler } = require('../helper/dbErrorHandler.js');

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    const { name, description, category, price, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !category ||
      !price ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: 'Missing required fields !',
      });
    }

    let product = new Product(fields);
    if (files.photo) {
      // 2 MB = 2000000 bytes
      if (files.photo.size > 2000000) {
        return res.status(400).json({
          error: 'Photo exceeds 2MB in size !!',
        });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }

    product.save((err, result) => {
      if (err) {
        consola.fatal('PRODUCT CREATE ERROR', err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    const { name, description, category, price, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !category ||
      !price ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: 'Missing required fields !',
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    if (files.photo) {
      // 2 MB = 2000000 bytes
      if (files.photo.size > 2000000) {
        return res.status(400).json({
          error: 'Photo exceeds 2MB in size !!',
        });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }

    product.save((err, result) => {
      if (err) {
        consola.fatal('PRODUCT CREATE ERROR', err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.patch = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    let product = fields;

    if (files.photo) {
      // 2 MB = 2000000 bytes
      if (files.photo.size > 2000000) {
        return res.status(400).json({
          error: 'Photo exceeds 2MB in size !!',
        });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }
    Product.findByIdAndUpdate(req.params.productId, product, { new: true })
      .then((product) => {
        if (!product) {
          return res.status(404).json({
            error: 'Update failed!',
          });
        }
        return res.status(200).json(product);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deleteProduct) => {
    if (err) {
      res.status(400).json({
        error: 'Could not delete product',
      });
    }
    res.status(200).json({
      message: 'Product deleted successfully!',
    });
  });
};

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        err: 'Product not found!',
      });
    }
    req.product = product;
    next();
  });
};

/*
sortBy - sold
orderBy - asc, desc
limit - 6
*/

exports.list = (req, res) => {
  let sortBy = req.query.sortBy ?? '_id';
  let order = req.query.order ?? 'asc';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }
      res.json(products);
    });
};

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Product.find({
    _id: { $ne: req.product },
    category: req.product.category,
  })
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }
      res.json(products);
    });
};

exports.listCategories = (req, res) => {
  Product.distinct('category', {}, (err, category) => {
    if (err) {
      return res.status(400).json('Category not found!');
    }
    res.json(category);
  });
};

exports.listBySearch = (req, res) => {
  let order = req.body.order ?? 'asc';
  let sortBy = req.body.sortBy ?? '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 6;
  let skip = parseInt(req.body.skip);

  let args = {};
  //triverse loop for filter conditions, add them to the args object
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        args[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        args[key] = req.body.filters[key];
      }
    }
  }

  Product.find(args)
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.photo = (req, res) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.type);
    return res.send(req.product.photo.data);
  }
  next();
};
