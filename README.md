# seller
A simple Used trading platform with react and express.

## 使用express和react构建的一个简单二手交易平台

1. 
add user aliyun config in server/config/oss-config.js



* 使用阿里云OSS，使用server/upload.js中v2，在server/config/oss-config中以以下形式配置
{
  region: 'oss-cn-beijing',
  accessKeyId: 'xx',
  accessKeySecret: 'xxx',
  bucket: 'xxxx'
}


## 功能开发

* [x] 登录注册
* [x] 使用redis控制用户session
* [x] 个人信息完善（头像等）
* [x] 商品列表
* [x] 商品展示
* [x] 商品发布
* [x] 用户信息修改
* [ ] 商品信息修改
* [ ] 上下架
* [ ] 买家卖家沟通
* [ ] 下单