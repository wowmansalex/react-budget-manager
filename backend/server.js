const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const colors = require('colors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;
const ConnectDB = require('./config/db');

ConnectDB();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/entries', require('./routes/entryRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, console.log(`server started on ${port}`));
