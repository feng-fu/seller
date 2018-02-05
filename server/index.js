const express = require('express');
const app = express();
const path = require('path');
const user = require('./user');
const goods = require('./goods');
const upload = require('./upload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 7000;
require('./mongo');
const redis = require('./redis');
const auth = require('./middleware/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  req.redis = redis
  next()
});
app.use(auth);
app.use('/user', user);
app.use('/goods', goods);
app.use('/upload', upload);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'public/404.html'), {}, err => {
    next(err)
  })
})

app.use((err, req, res, next) => {
  console.log(err.stack)
  console.log('something is error.')
  res.json({code: 1, msg: 'server error occured.'})
})

app.listen(port, () => {
  console.log(`server start at ${port}`);
})