const _ = require('lodash');
const config = require('../config');

const allowedHeaders = _.get(config, 'cors.allowedHeaders');
const allowedHttpMethod = _.get(config, 'cors.allowedHttpMethod');

const corsConfig = function (req, res, next) {
  const origin = _.get(req, 'headers.origin');
  const originValue = _.get(config, 'endpoints.app');
 // if (origin === originValue) {
    res.header('Access-Control-Allow-Origin', origin);
  //}
  res.header('Access-Control-Allow-Headers', allowedHeaders.join(','));
  // doesn't seem to work
  res.header('Access-Control-Allow-Methods', allowedHttpMethod.join(','));
  // We dont use session or cookies session
  res.header('Access-Control-Allow-Credentials', 'false');

  const { method } = req;
  if (!(allowedHttpMethod.indexOf(method) > -1)) {
    throw new Error('cors error');
    // some browser need 200 not 204 on OPTIONS request
  } else if (method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

module.exports = corsConfig;
