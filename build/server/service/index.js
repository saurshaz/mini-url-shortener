'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createShortLink = exports.isLinkAvailable = exports.remove = exports.update = exports.retrieve = exports.create = undefined;

var _jwtSimple = require('jwt-simple');

var _mongoskin = require('mongoskin');

var _mongoskin2 = _interopRequireDefault(_mongoskin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _mongoskin2.default.db(process.env.DB_URI);
var entity = 'short-links';

var create = exports.create = function create(data) {
  return new Promise(function (resolve, reject) {
    db.collection(entity).insert(data, function (err, result) {
      if (!err) {
        resolve({
          message: 'SUCCESS',
          response: result,
          error: false,
          errorObj: null
        });
      } else {
        reject({
          message: 'FAILED',
          response: null,
          error: true,
          errorObj: err
        });
      }
    });
  });
};

var retrieve = exports.retrieve = function retrieve(criteria, options) {
  return new Promise(function (resolve, reject) {
    db.collection(entity).findOne(criteria, options, function (err, result) {
      if (!err) {
        resolve({
          message: 'SUCCESS',
          response: result,
          error: false,
          errorObj: null
        });
      } else {
        reject({
          message: 'FAILED',
          response: null,
          error: true,
          errorObj: err
        });
      }
    });
  });
};

var update = exports.update = function update(criteria, data) {
  return new Promise(function (resolve, reject) {
    db.collection(entity).update(criteria, data, function (err, result) {
      if (!err) {
        resolve({
          message: 'SUCCESS',
          response: result,
          error: false,
          errorObj: null
        });
      } else {
        reject({
          message: 'FAILED',
          response: null,
          error: true,
          errorObj: err
        });
      }
    });
  });
};

var remove = exports.remove = function remove(criteria) {
  return new Promise(function (resolve, reject) {
    db.collection(entity).remove(criteria, function (err, deletedItem) {
      if (!err) {
        resolve({
          message: 'SUCCESS',
          response: deletedItem,
          error: false,
          errorObj: null
        });
      } else {
        reject({
          message: 'FAILED',
          response: null,
          error: true,
          errorObj: err
        });
      }
    });
  });
};

var isLinkAvailable = exports.isLinkAvailable = function isLinkAvailable(shortLink) {
  return new Promise(function (resolve, reject) {
    db.collection(entity).findOne({ short_link: shortLink }, function (err, data) {
      if (!err) {
        resolve({
          exists: data !== null
        });
      } else {
        reject({
          message: 'FAILED',
          response: null,
          error: true,
          errorObj: err
        });
      }
    });
  });
};

var createShortLink = exports.createShortLink = function createShortLink(originalUrl, desiredUrl) {
  return new Promise(function (resolve, reject) {
    var encodedUrl = desiredUrl;
    console.log(originalUrl + ' to ' + desiredUrl);
    // check for availability of desired url also
    // if available, apply that
    // else use the auto-generated one
    var payload = { originalUrl: originalUrl };
    if (desiredUrl) {
      encodedUrl = desiredUrl;
      isLinkAvailable(desiredUrl).then(function (data) {
        if (!data) {
          encodedUrl = (0, _jwtSimple.encode)(payload, process.env.SECRET);
        } else {
          encodedUrl = desiredUrl;
        }
        resolve(create({
          original_link: originalUrl,
          short_link: encodedUrl,
          is_active: true,
          created_by: process.env.OWNER,
          date_created: new Date(),
          last_modified: new Date()
        }));
      }).catch(function (err) {
        encodedUrl = (0, _jwtSimple.encode)(payload, process.env.SECRET);
        resolve(create({
          original_link: originalUrl,
          short_link: encodedUrl,
          is_active: true,
          created_by: process.env.OWNER,
          date_created: new Date(),
          last_modified: new Date()
        }));
      });
    } else {
      encodedUrl = (0, _jwtSimple.encode)(payload, process.env.SECRET);
      resolve(create({
        original_link: originalUrl,
        short_link: encodedUrl,
        is_active: true,
        created_by: process.env.OWNER,
        date_created: new Date(),
        last_modified: new Date()
      }));
    }
  });
};