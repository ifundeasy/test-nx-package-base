require('dotenv').config();

module.exports = {
  svc: {
    auth: process.env.SVC_URL_AUTH,
    main: process.env.SVC_URL_MAIN,
  },
  rpc: {
    auth: process.env.RPC_URL_AUTH,
    main: process.env.RPC_URL_MAIN,
  }
}
