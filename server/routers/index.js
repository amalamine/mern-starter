const config = require(`../../server/config/env`)[process.env.NODE_ENV];
const request = require('request');

module.exports = function(app) {
  require('./public')(app);
  require('./health')(app);
  require('./events')(app);
  require('./timeslots')(app, request, config);
  require('./bookings')(app, request, config);
  require('./users')(app, request, config);
};
