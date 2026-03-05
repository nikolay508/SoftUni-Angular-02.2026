const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
  console.log('Connecting to:', config.dbURL);
  return mongoose.connect(config.dbURL);
};
