const Product = require('../models/product.js');
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
