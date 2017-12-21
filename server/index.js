const express = require('express');
const app = express();
const user = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 7000;
require('./mongo');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user', user);

app.listen(port, () => {
  console.log(`server start at ${port}`);
})