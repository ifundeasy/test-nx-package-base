require('dotenv').config()

const {
  APP_SLUG,
  APP_PORT,
  APP_LOG_LEVEL,
  APP_NAME
} = process.env

module.exports = {
  slug: APP_SLUG,
  name: APP_NAME,
  port: APP_PORT,
  logLevel: APP_LOG_LEVEL
}
