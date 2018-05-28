const Redis = require('ioredis')
const redis = new Redis({
  port: 6379,
  host: '127.0.0.1',
  password: '',
  db: 0
})
// redis.disconnect()

module.exports = redis