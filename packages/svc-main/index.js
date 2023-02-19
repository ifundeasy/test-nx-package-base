const dependency1 = require('svc-auth/services/v1/example')

console.log(dependency1)

module.exports = {
  app: require('./app'),
  services: require('./services'),
};
