const { Op, Sequelize } = require('sequelize')
const Sql = require('utils/sql')

const sql = Sql.getInstance();
const { sequelize } = sql;

// eslint-disable-next-line no-unused-vars
function getRelations() {
  return [
    { model: sequelize.models.tableOne, as: 't1' },
    { model: sequelize.models.tableTwo, as: 't2' }
  ]
}

async function create(data, options = {}, writer = null) {
  return sequelize.models.authEnumerations.create(
    {
      createdBy: writer || 'SYSTEM',
      createdAt: await sql.getDatetime({
        ...{ transaction: options ? options.transaction : null },
      }),
      ...data
    },
    sql.constructOptions(options, false)
  )
}

async function getBy(options = {}) {
  const count = options.count || false
  const opts = {
    ...options,
    // include: getRelations(), // if you need some relation, open this comment
    where: {
      ...options.where,
      deletedAt: { [Op.is]: null }
    }
  }
  const parameters = sql.constructOptions(opts)
  if (count) return sequelize.models.authEnumerations.findAndCountAll(parameters)

  return sequelize.models.authEnumerations.findAll(parameters)
}

async function deleteBy(options = {}, writer = null) {
  const opts = {
    ...options,
    where: {
      ...options.where,
      deletedAt: { [Op.is]: null }
    },
    returning: true
  }
  const [count, rows] = await sequelize.models.authEnumerations.update(
    {
      deletedBy: writer || 'SYSTEM',
      deletedAt: await sql.getDatetime({
        ...{ transaction: options ? options.transaction : null },
      })
    },
    sql.constructOptions(opts, false)
  )

  return { count, rows }
}

async function updateBy(data, options = {}, writer = null) {
  const opts = {
    ...options,
    where: {
      ...options.where,
      deletedAt: { [Op.is]: null }
    },
    returning: true
  }
  const [count, rows] = await sequelize.models.authEnumerations.update(
    {
      updatedBy: writer || 'SYSTEM',
      updatedAt: await sql.getDatetime({
        ...{ transaction: options ? options.transaction : null },
      }),
      ...data
    },
    sql.constructOptions(opts, false)
  )

  return { count, rows }
}

module.exports = {
  create, getBy, updateBy, deleteBy
}
