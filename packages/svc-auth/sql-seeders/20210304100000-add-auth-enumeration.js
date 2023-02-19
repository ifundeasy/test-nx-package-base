/* eslint-disable no-param-reassign, no-restricted-syntax */

const Enum = {
  httpMethod: {
    add: 'POST',
    get: 'GET',
    remove: 'DELETE',
    update: 'PUT'
  }
};

function getEnumeration() {
  return Enum
}

function flattenNestedObj(obj, temp = {}, key = '') {
  for (const k in obj) {
    if (typeof obj[k] === 'object') {
      flattenNestedObj(obj[k], temp, key ? `${key}.${k}` : k);
    } else {
      const kk = key ? `${key}.${k}` : k
      temp[kk] = obj[k];
    }
  }
  return Object.keys(temp).map((k) => ({
    key: k,
    value: temp[k],
    createdBy: 'SYSTEM',
    notes: 'autocreated'
  }))
}

module.exports = {
  getEnumeration,
  flattenNestedObj,
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('authEnumerations', flattenNestedObj(Enum)),
  down: async (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    const condition = {
      [Op.or]: flattenNestedObj(Enum).map((record) => ({
        ...record,
        updatedBy: null,
        updatedAt: null
      }))
    }
    return queryInterface.bulkDelete('authEnumerations', condition)
  }
}
