const { app } = require('../../../../config')

exports.index = function (req, res) {
  res.send(app);
}

exports.getBook = function (req, res) {
  res.send('This route traversing authentication and authorization middleware');
}
