'use strict';
require('dotenv').config({silent: true, path: `${__dirname}/config/.env`});

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongostore = require('connect-mongo')(session);
const path = require('path');
const fs = require('fs');

const config = require(`${__dirname}/config/env`)[process.env.NODE_ENV];
const staticDir = process.env.STATIC_DIR || 'build';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new mongostore({url: config.mongo}),
    resave: true,
    saveUninitialized: true,
    cookie: {
        cookieName: 'connect.sid',
        secret: process.env.SESSION_SECRET,
        httpOnly: false,
        secure: false,
        ephemeral: true
    }
}));

if (process.env.NODE_ENV === 'production') {
  console.log('Running in prod')
  var compression = require('compression');
  app.use(compression());
  app.use(express.static(staticDir));
}

require('./services/index')(app);
require('./routers/index')(app);

if (process.env.NODE_ENV === 'production') {
  app.get('/*', function (req, res) {
     res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}

if (process.env.NODE_ENV === 'development') {
  app.all('*', function(req, res, next) {
    fs.readFile(`${__dirname}/data/test.json`, 'utf8', function (err, data) {
      if (err) throw err;
      if (typeof data === "string") data = JSON.parse(data);
      req.session.user = data.user;
      next();
    });
  });
}

app.listen(config.port, function(){
  console.log(`starter listening on port ${config.port}`);
});
