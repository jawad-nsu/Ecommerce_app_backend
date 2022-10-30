const express = require('express');
const router = express.Router();

const { create } = require('../../controllers/product.js');

router.post('/product', create);
