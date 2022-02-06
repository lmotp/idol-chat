const express = require('express');
const router = express.Router();
const User = require('../models/User');
const isAuth = require('../middleware/isAuth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/signup', (req, res) => {
  const { email } = req.body;
  const authUser = new User(req.body);

  User.findOne({ email }, (err, user) => {
    if (user) {
      return res.json({ message: 'E-amil 중복입니다.', success: false });
    } else {
      authUser.save((err, doc) => {
        if (err) {
          console.log('회원가입실패', err);
          return res.json({ message: '회원가입에 실패했습니다.', success: false });
        } else {
          res.json({ success: true });
        }
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password }, (err, user) => {
    if (err) {
      return console.log('로그인에러', err);
    }

    if (!user) {
      return res.status(403).json({
        loginSuccess: false,
        message: '로그인에 실패하셨습니다.',
      });
    } else {
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
          firstCategory: user.firstCategory,
        });
      });
    }
  });
});

router.get('/auth-check', isAuth, (req, res) => {
  const { gender, location, nickname, profileimg, myself, firstCategory, category, _id } = req.user;

  res.json({ gender, location, nickname, profileimg, myself, _id, category, firstCategory, loginSuccess: true });
});

router.post('/select-category', (req, res) => {
  const { clickCategory, id } = req.body;

  User.findOneAndUpdate({ _id: id }, { firstCategory: true, $push: { category: clickCategory } }, (err, doc) => {
    if (err) {
      console.log(err);
    }

    return res.status(200).send('굿');
  });
});

router.get('/logout', isAuth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
    if (err) return res.json({ err });
    return res.clearCookie('auth').status(200).send();
  });
});

router.post('/modify', upload.single('image'), (req, res) => {
  const img = req.file ? `/api/image/${req.file.filename}` : req.body.image;
  const { id, gender, myself, nickname } = req.body;

  User.findOneAndUpdate({ _id: id }, { gender, myself, nickname, profileimg: img }, (err, doc) => {
    if (err) {
      console.log('유저정보수정 에러', err);
    }
    res.status(200).send(doc);
  });
});

module.exports = router;
