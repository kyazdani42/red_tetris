const mongoose = require('mongoose');
const config = require('../config');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const mongoOptions = {
  useNewUrlParser: true,
  reconnectTries: 10,
  reconnectInterval: 1000,
  keepAlive: 1,
  connectTimeoutMS: 3600000,
  socketTimeoutMS: 3600000,
  autoReconnect: true,
  poolSize: config.mongo.poolSize,
};

const buildConnectUri = function () {
  let uri = '';
  uri += config.mongo.uriPrefix;
  uri += `${config.mongo.host}:${config.mongo.port}`;
  uri += `/${config.mongo.database}`;
  return uri;
};

function initClient() {
  return new Promise((resolve) => {
    mongoose.connect(buildConnectUri(), mongoOptions);
    mongoose.connection.on('connected', resolve);
  });
}

module.exports = {
  initClient,
};