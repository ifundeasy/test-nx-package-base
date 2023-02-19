const { loadPackageDefinition, credentials } = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const grpcInterceptor = require('./grpc-interceptor')

function loader(config, opts = {}) {
  const packageDefinition = protoLoader.loadSync(config.proto, opts);
  const grpcObject = loadPackageDefinition(packageDefinition);
  const client = new grpcObject[config.name][config.service](
    config.host,
    credentials.createInsecure(),
    {
      interceptors: [
        grpcInterceptor({ config })
      ]
    }
  );

  return client
}

module.exports = loader;
