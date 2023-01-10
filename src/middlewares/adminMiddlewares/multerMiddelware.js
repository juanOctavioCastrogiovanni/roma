const multer = require('multer')
const path = require('path')
var express = require('express');
express.static(path.join(__dirname, 'public'))



module.exports = function () {

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/upload');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

var upload = multer({ storage: storage });

    return upload

}
