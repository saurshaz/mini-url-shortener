'use strict';

var _index = require('../service/index');

var service = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = function (app) {
  var handleResponse = function handleResponse(promise, res) {
    promise.then(function (data) {
      res.json({ data: data });
    }).catch(function (err) {
      console.error(err);
      res.json({ err: err, error: true });
    });
  };

  // - check if the desired short-URL is available or not
  // - return the matching data against this url, if present
  // - earlier short-url can be of use, no need to create a new one
  app.get('/api/v1/available/:url', function (req, res) {
    handleResponse(service.retrieve({ short_link: req.params.url }), res);
  });

  // - a simple API to generate a short URL based on the passed URL,
  //   save that in database and return the generated data.
  app.get('/api/v1/short-link', function (req, res) {
    var originalUrl = req.query.url;
    var desiredUrl = req.query.desired;
    handleResponse(service.createShortLink(originalUrl, desiredUrl), res);
  });

  // - a simple API to generate a short URL (pass to GET handler)
  app.post('/api/v1/short-link', function (req, res) {
    handleResponse(service.createShortLink(req.body.url, req.body.desired), res);
  });

  // - a simple API to delete a short URL record
  app.delete('/api/v1/short-link', function (req, res) {
    var shortLink = req.query.shorturl;
    handleResponse(service.remove({
      short_link: shortLink
    }), res);
  });

  // - have a route that gives back the original link against the short-link passed,
  //     also updates the stats collection against the same
  // - redirect based on the response to original URL
  app.get('/api/v1/goto/:url', function (req, res) {
    service.retrieve({
      short_link: req.params.url
    }).then(function (data) {
      if (data && data.response && data.response.original_link && !data.error) {
        // update the STATS for this link
        service.update({ short_link: req.params.url }, { $inc: { count: 1 } });
        // service.update({
        res.redirect(200, data.response.original_link);
      } else {
        res.redirect(404, '/');
      }
    }).catch(function (err) {
      res.json(err);
    });
  });

  // index page
  app.get('/', function (req, res) {
    res.render('index');
  });

  var cleanupOldLinks = function cleanupOldLinks() {
    // @todo :: - delete the links that are past 15 days back from now and delete those(cron task)
    // res.json({deleteed: true});
  };
};