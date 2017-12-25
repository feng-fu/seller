const express = require('express');
const app = express();
const user = require('./user');
const goods = require('./goods');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 7000;
require('./mongo');
const redis = require('./redis');
const auth = require('./middleware/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function(req, res, next) {
  req.redis = redis
  next()
});
app.use(auth);
app.use('/user', user);
app.use('/goods', goods);



app.listen(port, () => {
  console.log(`server start at ${port}`);
})