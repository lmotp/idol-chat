const User = require('../models/User');

let auth = (req, res, next) => {
  let token = req.cookies.auth;

  User.findByToken(token, (err, doc) => {
    if (err) throw err;
    if (!doc)
      return res.json({
        isAuth: false,
        error: true,
      });

    req.token = token;
    req.user = doc;
    next();
  });
};

module.exports = auth;
