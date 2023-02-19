const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('authEnumerations', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: 'authEnumerations_key_key'
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'SYSTEM'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedBy: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedBy: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'authEnumerations',
    schema: 'public',
    timestamps: false,
    underscored: false,
    freezeTableName: true,
    indexes: [
      {
        name: 'authEnumerations_ALL',
        unique: true,
        fields: [
          { name: 'key' },
          { name: 'deletedAt' },
        ]
      },
      {
        name: 'authEnumerations_key_key',
        unique: true,
        fields: [
          { name: 'key' },
        ]
      },
      {
        name: 'authEnumerations_pkey',
        unique: true,
        fields: [
          { name: 'id' },
        ]
      },
    ]
  });
};
