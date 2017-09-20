'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewAccessToken = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNewAccessToken = exports.getNewAccessToken = function getNewAccessToken(optionsJson, cb) {
  (0, _request2.default)(optionsJson, function (error, response, body) {
    if (error) {
      cb({ error: error });
    } else {
      cb(null, body);
    }
  });
};