const { authorization } = require('validations');

module.exports = function (req, res, next) {
  const allowed = authorization(req.headers.authorization);
  if (!allowed) {
    return next(new Error('Authorization fail'))
  }
  return next()
}
