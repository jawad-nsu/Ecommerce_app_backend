const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('get route serving');
});

app.listen(PORT, () => {
  console.log('Listening on port 8000 updated');
});
