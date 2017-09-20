'use strict';

/*
 * Wrapper for logging server messages at different log levels
*/
var bunyan = require('bunyan');
var PrettyStream = require('bunyan-prettystream');

var stream = new PrettyStream();
stream.pipe(process.stdout);

var requestSerializer = function requestSerializer(req) {
  return {
    path: req.path,
    method: req.method,
    headers: req.headers
  };
};

var responseSerializer = function responseSerializer(res) {
  return {
    payload: res.output.payload
  };
};

var errorSerializer = function errorSerializer(error) {
  if (error) {
    if (typeof error === 'string') {
      return {
        message: error
      };
    }

    // The `message` property of an Error object isn't enumerable,
    // so we clone the object and attach it to make sure it's logged
    var serializedData = JSON.parse(JSON.stringify(error));
    serializedData.message = error.message;

    return serializedData;
  }
  return error;
};

module.exports = bunyan.createLogger({
  name: process.env.SERVICE_NAME,
  level: process.env.LOG_LEVEL || 'info',
  serializers: {
    request: requestSerializer,
    response: responseSerializer,
    error: errorSerializer
  },
  stream: stream
});