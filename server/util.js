const uuidV4 = require('uuid/v4')


;(async () => {
  await redis.disconnect()
  redis.connect(function(err) {
    if(err) console.log('err:', err)
    // console.log(result)
    redis.set('aaa', 'bbb')
    redis.get('aaa', function(err, val) {
      if(err) console.log('err', err)
      console.log(val)
    })
  })
  // c.set('foo', 'ccc');
  // console.log(await c.get('foo'));
  // console.log(uuidV4())
})()

export function setSession(name) {
  redis.connect(function(err) {
    if(err) console.log('err:', err)
    const val = uuidV4()
    redis.set(name, val)
    return val
  })
}
