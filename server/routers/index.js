const config = require(`../../server/config/env`)[process.env.NODE_ENV];
const request = require('request');

module.exports = function(app) {
  require('./public')(app);
  require('./health')(app);
  require('./example')(app);
};
