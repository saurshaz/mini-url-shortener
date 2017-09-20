'use strict';

var _habitat = require('habitat');

var _habitat2 = _interopRequireDefault(_habitat);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

switch (process.env.NODE_ENV) {
  case 'prod':
    _habitat2.default.load(_path2.default.resolve(__dirname, '../../config/.env.prod'));
    break;
  case 'test':
    _habitat2.default.load(_path2.default.resolve(__dirname, '../../config/.env.test'));
    break;
  case 'development':
    // @review :: sample.env is not supposed to be used anywhere
    _habitat2.default.load(_path2.default.resolve(__dirname, '../../config/.env'));
    break;
  case 'stage':
    _habitat2.default.load(_path2.default.resolve(__dirname, '../../config/.env.stage'));
    break;
  default:
    // @review :: sample.env is not supposed to be used anywhere
    _habitat2.default.load(_path2.default.resolve(__dirname, '../../config/sample.env'));
}
var env = new _habitat2.default();
module.exports = env;