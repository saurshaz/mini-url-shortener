import * as service from '../service/index';

module.exports = (app) => {
  const handleResponse = (promise, res) => {
    promise
      .then((data) => {
        res.json({data});
      }).catch((err) => {
        console.error(err);
        res.json({err, error: true});
      });
  };

  // - check if the desired short-URL is available or not
  // - return the matching data against this url, if present
  // - earlier short-url can be of use, no need to create a new one
  app.get('/api/v1/available/:url', (req, res) => {
    handleResponse(service.retrieve({short_link: req.params.url}), res);
  });

  // - a simple API to generate a short URL based on the passed URL,
  //   save that in database and return the generated data.
  app.get('/api/v1/short-link', (req, res) => {
    const originalUrl = req.query.url;
    const desiredUrl = req.query.desired;
    handleResponse(service.createShortLink(originalUrl, desiredUrl), res);
  });

  // - a simple API to generate a short URL (pass to GET handler)
  app.post('/api/v1/short-link', (req, res) => {
    handleResponse(service.createShortLink(req.body.url, req.body.desired), res);
  });

  // - a simple API to delete a short URL record
  app.delete('/api/v1/short-link', (req, res) => {
    const shortLink = req.query.shorturl;
    handleResponse(service.remove({
      short_link: shortLink
    }), res);
  });

  // - have a route that gives back the original link against the short-link passed,
  //     also updates the stats collection against the same
  // - redirect based on the response to original URL
  app.get('/api/v1/goto/:url', (req, res) => {
    service.retrieve({
      short_link: req.params.url
    }).then((data) => {
      if (data && data.response && data.response.original_link && !data.error) {
        // update the STATS for this link
        service.update({short_link: req.params.url}, { $inc: { count: 1 }});
        // service.update({
        res.redirect(200, data.response.original_link);
      } else {
        res.redirect(404, '/');
      }
    }).catch((err) => {
      res.json(err);
    });
  });

  // index page
  app.get('/', (req, res) => {
    res.render('index');
  });

  const cleanupOldLinks = () => {
    // @todo :: - delete the links that are past 15 days back from now and delete those(cron task)
    // res.json({deleteed: true});
  };
};
