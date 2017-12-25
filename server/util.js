const uuidV4 = require('uuid/v4')

export function setSession(name) {
  redis.connect(function(err) {
    if(err) console.log('err:', err)
    const val = uuidV4()
    redis.set(name, val)
    return val
  })
}
