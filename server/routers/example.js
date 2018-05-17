var express = require('express');

module.exports = function(app) {
  var router = express.Router();

  router.get('/', function(req, res, next) {
    if (process.env.NODE_ENV === 'production' && !req.session.user) res.redirect('/login');
    res.json({message: 'success'})
  });

  app.use("/endpoints/example", router);
}
