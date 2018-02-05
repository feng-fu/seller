# seller
A simple Used trading platform with react and express.

# 使用express和react构建的一个简单二手交易平台

1. 
add user aliyun config in server/config/oss-config.js



* 使用阿里云OSS，使用server/upload.js中v2，在server/config/oss-config中以以下形式配置
{
  region: 'oss-cn-beijing',
  accessKeyId: 'xx',
  accessKeySecret: 'xxx',
  bucket: 'xxxx'
}