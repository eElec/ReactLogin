const jwt = require('jsonwebtoken');
const secret = require('../secret');

const withAuth = function(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  if (!token) {
    next();
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        next();
      } else {
        req.user = decoded;
        next();
      }
    });
  }
}
module.exports = withAuth;