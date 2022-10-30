require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const consola = require('consola');
const expressValidator = require('express-validator');

const auth = require('./routes/v1/auth');
const user = require('./routes/v1/user');
const category = require('./routes/v1/category');
const product = require('./routes/v1/product');

const PORT = process.env.PORT || 8000;

//APP
const app = express();

//DB
mongoose
  .connect(process.env.DATABASE)
  .then(() => consola.success('DB connected'))
  .catch((err) => consola.fatal('DB error ->', err));

//MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//ROUTES MIDDLEWARE
app.use('/api/v1', auth);
app.use('/api/v1', user);
app.use('/api/v1', category);
app.use('/api/v1', product);

app.listen(PORT, () => {
  consola.success('Listening on port 8000 updated');
});
