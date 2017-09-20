/*
 * Wrapper for logging server messages at different log levels
*/
const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');

const stream = new PrettyStream();
stream.pipe(process.stdout);

const requestSerializer = req => ({
  path: req.path,
  method: req.method,
  headers: req.headers
});

const responseSerializer = res => ({
  payload: res.output.payload
});

const errorSerializer = (error) => {
  if (error) {
    if (typeof error === 'string') {
      return {
        message: error
      };
    }

    // The `message` property of an Error object isn't enumerable,
    // so we clone the object and attach it to make sure it's logged
    const serializedData = JSON.parse(JSON.stringify(error));
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
  stream
});
