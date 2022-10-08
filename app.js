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

const PORT = process.env.PORT || 8000;

//APP
const app = express();

//DB
mongoose
  .connect(process.env.DATABASE)
  .then(() => consola.success('DB connected'))
  .catch((err) => console.fatal('DB error ->', err));

//MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//ROUTES MIDDLEWARE
app.use('/api/v1', auth);
app.use('/api/v1', user);

app.listen(PORT, () => {
  consola.success('Listening on port 8000 updated');
});
