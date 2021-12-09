const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;
require('dotenv').config();
const http = require('http').createServer(app);

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.json({ limit: '200mb' }));

app.use((req, res, next) => {
  next();
});

const MONGODB_URL = 'mongodb://localhost/fresh';
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to %s', MONGODB_URL);
    console.log('App with mongoDb is running ... \n');
    console.log('Press CTRL + C to stop the process. \n');
  })
  .catch((err) => {
    console.error('App starting error:', err.message);
    process.exit(1);
  });
const db = mongoose.connection;

app.use(express.static(path.join(__dirname, '/dist')));

require('./Routes')(app);

const jsn = { Status: 'Your Server Is Started Now' };
app.get('/*', (req, res) => {
  res.send(jsn);
});

app.use(express.static(`${__dirname}/Public`));

http.listen(port, () => {
  console.log('Server started Port', port);
});

