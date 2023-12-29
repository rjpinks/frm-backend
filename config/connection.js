const mongoose = require('mongoose');

mongoose.connect(
    // I WILL NEED TO CHANGE THE CONNECTION STRING ONCE I HAVE MY DATABASE
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

module.exports = mongoose.connection;
