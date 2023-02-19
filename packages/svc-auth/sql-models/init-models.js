const { DataTypes } = require('sequelize');
const _authMetas = require('./authMetas');
const _authSeeds = require('./authSeeds');
const _authEnumerations = require('./authEnumerations');

function initModels(sequelize) {
  const authMetas = _authMetas(sequelize, DataTypes);
  const authSeeds = _authSeeds(sequelize, DataTypes);
  const authEnumerations = _authEnumerations(sequelize, DataTypes);

  return {
    authMetas,
    authSeeds,
    authEnumerations,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
