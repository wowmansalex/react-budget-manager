const mongoose = require('mongoose');

const ConnectDB = async db => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`Mongo DB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = ConnectDB;
