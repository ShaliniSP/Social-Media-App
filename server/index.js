const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const config = require('../config/config');

const port  = config.RESTAPIport;

// Configuration
// =========================================================================

// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200,
// }

// Set up Mongoose
mongoose.connect(config.db, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// log requests to console
app.use(morgan('dev'));

// log all requests to access.log
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' })
}));

// API routes
require('./routes')(app);

app.use(express.static(path.resolve(__dirname, '../build')));

// app.get('*', function (req, res) {
//     res.sendFile(path.resolve(__dirname, '../build/index.html'))
//     res.end();
// });

// app.get('*', function(req, res) {
//   res.status(200).send({ message: 'Done' });
// });
app.route('*')
.all( function(req, res) {
  res.status(405).send({ message: 'Method not allowed'});
});
app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('Open http://localhost:%s/ in your browser.', port);
});

module.exports = app;
