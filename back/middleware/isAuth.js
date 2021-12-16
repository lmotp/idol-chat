const User = require('../models/User');
const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  if (req.headers.authorization) {
    const headerAccessToken = req.headers.authorization.split('Bearer ')[1];

    if (!headerAccessToken) {
      throw Error('API 사용 권한이 없습니다.');
    }

    const accessToken = jwt.verify(headerAccessToken, process.env.JWT_SCRET_KEY);
    const decodedId = accessToken._id;
    const refreshToken = req.cookies.Ref_auth;

    if (!accessToken) {
      if (!refreshToken) {
        throw Error('API 사용 권한이 없습니다');
      } else {
        User.findOne({ token: refreshToken }, (err, doc) => {
          if (err) {
            console.log('토큰 액시스토큰이없어', err);
          }

          const newAccessToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SCRET_KEY, {
            expiresIn: '1h',
            issuer: 'unoeye22',
            subject: 'userInfoAccess',
          });
          res.json({ newAccessToken, tokenSuccess: true });
          req.user = doc;
          next();
        });
      }
    } else {
      if (!refreshToken) {
        User.findOne({ _id: decodedId }, (err, doc) => {
          if (err) {
            console.log('토큰 리프레시토큰이없어', err);
          }

          const newRefreshToken = jwt.sign({}, process.env.JWT_SCRET_KEY, {
            expiresIn: '6h',
            issuer: 'unoeye22',
            subject: 'userInfo',
          });

          res.cookie('Ref_auth', newRefreshToken, { httpOnly: true });
          doc.token = newRefreshToken;
          doc.save();
          req.user = doc;
          next();
        });
      } else {
        User.findOne({ _id: decodedId, token: refreshToken }, (err, doc) => {
          if (err) {
            console.log('토큰 둘다있는부분', err);
          }

          req.user = doc;
          next();
        });
      }
    }
  }
};

module.exports = isAuth;
