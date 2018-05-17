var express = require('express');

module.exports = function(app) {
  var router = express.Router();

  router.get('/', function(req, res, next) {
    if (process.env.NODE_ENV === 'production' && !req.session.user) res.redirect('/login');
    console.log('Getting stored events ')
    res.send(req.session.events)
  });

  app.use("/endpoints/events", router);
}
