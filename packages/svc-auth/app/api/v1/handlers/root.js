const { app } = require('../../../../config');
const { enumeration } = require('../../../../services/v1');

exports.index = function (req, res) {
  res.send(app);
}

exports.getEnum = async function (req, res) {
  const data = await enumeration.getBy()
  res.send(data)
}

exports.getProfile = function (req, res) {
  res.send('This route traversing authentication and authorization middleware');
}
