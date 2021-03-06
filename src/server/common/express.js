const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressNunjucks = require('express-nunjucks');

module.exports = (app) => {

  app.set('port', (process.env.PORT || 3000));
  app.set('view cache', false);
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, '..', 'views'));
  /* eslint-disable */
  // app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
  /* eslint-enable */
  app.disable('x-powered-by');

  app.use(express.static(path.join(__dirname, '..', '..', 'client')));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
  app.use(session({
    secret: process.env.SESSIONS_SECRET,
    resave: true,
    saveUninitialized: true
  }));

  expressNunjucks(app, {
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
    watch: true,
    noCache: true,
    tags: {}
  });
};
