const express = require('express');
const { create } = require('../../controllers/category');
const router = express.Router();

router.post('/category/create', create);

module.exports = router;
