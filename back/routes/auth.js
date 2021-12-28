const express = require('express');
const router = express.Router();
const User = require('../models/User');
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
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    }
  });
});

router.get('/auth-check', isAuth, (req, res) => {
  const { email, gender, location, nickname, profileimg, _id } = req.user;

  res.json({ email, gender, location, nickname, profileimg, _id, loginSuccess: true });
});

router.get('/logout', isAuth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
    if (err) return res.json({ err });
    return res.clearCookie('auth').status(200).send();
  });
});

module.exports = router;
