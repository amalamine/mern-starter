var express = require('express');

module.exports = (app) => {
  var router = express.Router();
  router.use(express.static(process.cwd() + '/public'));
  app.use(router);
}
