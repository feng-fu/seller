const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const uuid = require('uuid')
var OSS = require('ali-oss')
var client = new OSS({

})
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/tmp/my-uploads')
//   },
//   // path.join(__dirname, '/avatar'),
//   filename: function (req, file, cb) {
//     cb(null, uuid.v4() + '-' + Date.now() + '.' + file.mimetype.split('/').pop())
//   }
// })
// var upload = multer({ storage: storage })
var upload = multer({ dest: 'uploads/' })


router.post('/avatar', upload.single('avatar'), async (req, res, next) => {
  console.log(req.file)
  return res.json({code: 0})
})


module.exports = router