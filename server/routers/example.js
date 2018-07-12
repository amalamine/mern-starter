var express = require('express');

module.exports = (app) => {
  var router = express.Router();

  router.get('/', (req, res, next) => {
    if (process.env.NODE_ENV === 'production' && !req.session.user) res.redirect('/login');
    console.log('response')
    res.send(true)
  });

  app.use("/endpoints/example", router);
}
