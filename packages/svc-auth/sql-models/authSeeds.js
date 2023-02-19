const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('authSeeds', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: '_authSeeds',
    schema: 'public',
    timestamps: false,
    underscored: false,
    freezeTableName: true,
    indexes: [
      {
        name: '_authSeeds_pkey',
        unique: true,
        fields: [
          { name: 'name' },
        ]
      },
    ]
  });
};
