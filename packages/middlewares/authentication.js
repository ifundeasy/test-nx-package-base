const { authentication } = require('validations');

module.exports = function (req, res, next) {
  const allowed = authentication(req.headers.authorization);
  if (!allowed) {
    return next(new Error('Authentication fail'))
  }
  return next()
}
