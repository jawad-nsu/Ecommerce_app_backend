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
  Product.find().
}