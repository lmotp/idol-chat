const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const isAuth = require('../middleware/isAuth');

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
    console.log(user);

    if (err) {
      return console.log('로그인에러', err);
    }

    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '로그인에 실패하셨습니다.',
      });
    } else {
      const refreshToken = jwt.sign({}, process.env.JWT_SCRET_KEY, {
        expiresIn: '6h',
        issuer: 'unoeye22',
        subject: 'userInfo',
      });
      user.token = refreshToken;
      user.save();

      const accessToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SCRET_KEY, {
        expiresIn: '1h',
        issuer: 'unoeye22',
        subject: 'userInfoAccess',
      });

      res.cookie('Ref_auth', refreshToken, { httpOnly: true });
      res.send({ accessToken, loginSuccess: true });
    }
  });
});

router.get('/auth-check', isAuth, (req, res) => {
  const { _id, email, nickname, location, gender } = req.user;

  res.json({
    _id,
    email,
    nickname,
    location,
    gender,
    authCheckTrue: true,
  });
});

module.exports = router;
