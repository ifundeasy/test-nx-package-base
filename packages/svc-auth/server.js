const http = require('http')
const app = require('./app')
const { app: opts } = require('./config')

const server = http.createServer(app)
server.listen(opts.port, () => console.log(`The svc-auth listen on ${opts.port}`))
