const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('authMetas', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: '_authMetas',
    schema: 'public',
    timestamps: false,
    underscored: false,
    freezeTableName: true,
    indexes: [
      {
        name: '_authMetas_pkey',
        unique: true,
        fields: [
          { name: 'name' },
        ]
      },
    ]
  });
};
