const excludeList = ['/v1/user/login', '/v1/user/register']
module.exports = (req, res, next) => {
  if(excludeList.indexOf(req.path) > -1) return next()
  const redis = req.redis
  const { sessionId, name } = req.cookies
  if(!sessionId || !name) return res.json({code: 1, msg: '请先登录再进行操作'})
  // redis.connect(function(e) {
  //   console.log('redis link.')
  //   if(e) {
  //     redis.disconnect()
  //     console.log('redis link error:', e.stack)
  //     res.json({code: 1, msg: 'redis连接失败'})
  //   }
    redis.get(name, function(e, d) {
      // redis.disconnect()
      if(e) {
        console.log('redis find data error:', e.stack)
        return res.json({code: 1, msg: '服务器出错'})
      }
      if(d !== sessionId) return res.json({code:1, msg: '登录超时'})
      req.userName = name
      next()
    })
  // })
}