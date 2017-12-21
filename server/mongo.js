const mongoose = require('mongoose')
const bluebird = require('bluebird')
mongoose.Promise = bluebird.Promise
mongoose.connect('mongodb://localhost:27017/sell', {useMongoClient: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connect error:'))

db.on('open', () => {
  console.log('mongo connect success.')
})