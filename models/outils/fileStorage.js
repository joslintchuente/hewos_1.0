const multer = require('multer');
const JWT_SIGN_SECRET = 'bliaeue15zpq1xz7saa97saszdeeeoc1187ed9z39j7o1z8zex';
let jwt = require('jsonwebtoken');
const fs = require('fs/promises');
var path = require('path');

// pour les images de publications
let storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    if (req.body.token) {
      try {

        let data = jwt.verify(req.body.token, JWT_SIGN_SECRET);
        try {
          await fs.mkdir('public/images/user_' + data.id_pays + '_' + data.telephone);
        } catch (e) {

        } finally {
          try {
            await fs.mkdir('public/images/user_' + data.id_pays + '_' + data.telephone + '/publications');
          } catch (error) {
            if (error.code == "EEXIST") {
             
              cb(null, './public/images/user_' + data.id_pays + '_' + data.telephone + '/publications');
            } else {
              cb(error);
            }
          }
          cb(null, './public/images/user_' + data.id_pays + '_' + data.telephone + '/publications');


        }

      } catch (error) {
        console.log(error);
        cb(error);
      }
    }
  },
  filename: function (req, file, cb) {
    let filename = file.fieldname + "_" + Date.now() + "_" + file.originalname;
    req.body.filename = filename;
    cb(null, filename);
  },
})

let upload = multer({
  storage: storage
}).single("photo");

// pour les images de profil

let storage2 = multer.diskStorage({
  destination: async function (req, file, cb) {
    if (req.body.token) {
      try {

        let data = jwt.verify(req.body.token, JWT_SIGN_SECRET);
        try {
          await fs.mkdir('public/images/user_' + data.id_pays + '_' + data.telephone);
          await fs.mkdir('public/images/user_' + data.id_pays + '_' + data.telephone + '/profil');
        } catch (error) {
          if (error.code == "EEXIST") {
            cb(null, './public/images/user_' + data.id_pays + '_' + data.telephone + '/profil');
          } else {
            cb(error);
          }
        }
        cb(null, './public/images/user_' + data.id_pays + '_' + data.telephone + '/profil');
      } catch (error) {
        console.log(error);
        cb(error);
      }
    }
  },
  filename: function (req, file, cb) {
    let filename = file.fieldname + "_" + Date.now() + "_" + file.originalname;
    req.body.filename = filename;
    cb(null, filename);
  },
})

let upload2 = multer({
  storage: storage2
}).single("photo");

module.exports = {
  imageStorage: upload,
  imageStorage2: upload2,
};