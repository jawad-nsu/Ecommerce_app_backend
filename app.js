require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const users = require('./routes/v1/users');

const PORT = process.env.PORT || 8000;

//APP
const app = express();

//DB
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB error ->', err));

//MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser.json());

//ROUTES MIDDLEWARE
app.use('/api/v1', users);

app.listen(PORT, () => {
  console.log('Listening on port 8000 updated');
});
