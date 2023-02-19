const _ = require('lodash')
const { Op, Sequelize } = require('sequelize')

const Singleton = require('./singleton');

class Sql extends Singleton {
  opts;

  model;

  sequelize;

  constructor(config) {
    super();
    this.opts = config;
    this.sequelize = new Sequelize(this.opts);

    if ([undefined, true].indexOf(this.opts.logConnection) > -1) {
      this.sequelize.beforeConnect((...args) => console.debug('Sql on connecting..'))
      this.sequelize.afterConnect((...args) => console.debug('Sql connected'))
      this.sequelize.beforeDisconnect((...args) => console.debug('Sql disconnecting..'))
      this.sequelize.afterDisconnect((...args) => console.debug('Sql disconnected'))
    }
  }

  async connect() {
    try {
      await this.sequelize.authenticate()
      console.info('Sql authenticated')
    } catch (err) {
      console.error('Sql on error');
      if (err.parent) {
        if (err.parent.message !== err.message) {
          console.error(err.parent)
        }
      }
      if (err.original) {
        if (err.parent) {
          if (err.original.message !== err.parent.message) {
            console.error(err.original)
          }
        }
      }

      await this.sequelize.close();
    }
  }

  async getDatetime(options) {
    const data = await this.sequelize.query(
      this.opts.query.dateTime,
      { ...options, raw: true, type: Sequelize.QueryTypes.SELECT }
    )
    return Object.values(data[0])[0]
  }

  fixOperator(condition) {
    const me = this;
    const data = _.cloneDeep(condition)
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Object) data[key] = me.fixOperator(value)

      if (key.indexOf('$') === 0) {
        data[Op[key.substring(1)]] = _.cloneDeep(value)
        delete data[key]
      }
    })
    return data
  }

  constructOptions(opts = {}, multiple = true) {
    const options = _.cloneDeep(opts);
    if (multiple) {
      options.limit = options.limit || 10
      options.offset = options.offset || 0

      if (options.limit === -1) delete options.limit;
    }

    if (options.where) options.where = this.fixOperator(options.where)
    if (options.include) {
      if (options.attributes) {
        const attributes = []
        Object.keys(options.attributes).forEach(idx => {
          const key = options.attributes[idx]
          const keys = key.split('.')
          if (keys.length > 1) {
            const field = keys[keys.length - 1]

            keys.pop()

            const alias = keys.join('.')
            const inner = options.include.filter(el => el.as === alias)[0]
            if (inner) {
              inner.attributes = inner.attributes || []
              inner.attributes.push(field)
            } else {
              attributes.push(key)
            }
          } else {
            attributes.push(key)
          }
        })
        delete options.attributes
        if (attributes.length) options.attributes = attributes
      }

      Object.keys(options.where).forEach(key => {
        const keys = key.split('.')
        if (keys.length > 1) {
          const field = keys[keys.length - 1]

          keys.pop()

          const alias = keys.join('.')
          const inner = options.include.filter(el => el.as === alias)[0]
          if (inner) {
            inner.where = inner.where || {}
            inner.where[field] = options.where[key]
            inner.where.deletedAt = { [Op.is]: null }
          }

          delete options.where[key]
        }
      })
    }

    return options
  }
}

module.exports = Sql;
