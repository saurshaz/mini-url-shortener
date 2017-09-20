import express from 'express';
import './common/lib/environment';

// logger depends on environment variables to be set, make sure to include environment before logger
import log from './common/lib/logger';

const app = express();

// Bootstrap application settings
require('./common/express')(app);

// Bootstrap routes
require('./routes')(app);

app.listen(process.env.PORT || process.env.APP_PORT, () => {
  log.info('started app at ', process.env.PORT || process.env.APP_PORT, ' in ', process.env.NODE_ENV);
});
