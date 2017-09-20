'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

require('./common/lib/environment');

var _logger = require('./common/lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Bootstrap application settings


// logger depends on environment variables to be set, make sure to include environment before logger
require('./common/express')(app);

// Bootstrap routes
require('./routes')(app);

app.listen(process.env.PORT || process.env.APP_PORT, function () {
  _logger2.default.info('started app at ', process.env.PORT || process.env.APP_PORT, ' in ', process.env.NODE_ENV);
});