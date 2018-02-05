const express = require('express')
const router = express.Router()
const multer = require('multer')
const uuid = require('uuid')
const OSS = require('ali-oss')
const ossConfig = require('./config/oss-config')
const path = require('path');
const model = require('./model')
const UserModel = model.getModel('user')

var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
     destination: function (req, file, cb) {
         cb(null, path.join(__dirname, 'public/avatar'))
    }, 
  //给上传文件重命名，获取添加后缀名
   filename: function (req, file, cb) {
       var fileFormat = (file.originalname).split(".");
       cb(null, uuid.v4() + "." + fileFormat[fileFormat.length - 1]);
   }
});

var upload = multer({
  storage: storage
});
router.post('/avatar', upload.single('avatar'), async (req, res, next) => {
  try {
    const result = {avatar: '/avatar/' + req.file.filename}
    await UserModel.findOneAndUpdate({name: req.userName}, result)
    return res.json({code: 0, result})
  } catch (error) {
    console.log(error.stack)
    next(error)
  }
})



// ----------------------------------v2  use aliyun oss----------------------------------------------------
// const client = new OSS.Wrapper(ossConfig);
// var storage = multer.memoryStorage()
// var upload = multer({ storage: storage })

// router.post('/avatar', upload.single('avatar'), async (req, res, next) => {
//   try {
//     const buffer = req.file.buffer
//     const filename = uuid.v4() + '.' + req.file.originalname.split('.').pop()
//     const uploadResult = await client.put(filename, buffer)
//     const result = {avatar: uploadResult.url}
//     await UserModel.findOneAndUpdate({name: req.userName}, result)
//     return res.json({code: 0, result})
//   } catch (error) {
//     console.log(error.stack)
//     next(error)
//   }
// })
// ----------------------------------------- end ----------------------------------------------------------


module.exports = router