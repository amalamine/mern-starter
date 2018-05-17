var express = require('express');

module.exports = function(app, request, {endpoint}) {
  var router = express.Router();

  router.get('/', function(req, res, next) {
    if (process.env.NODE_ENV === 'production' && !req.session.user) res.redirect('/login');
    var options = {
        method: 'GET',
        uri: `${endpoint}:${req.session.user.port}/api/EventTimeSlotBooking`
    };
    request.get(options, function (error, response, body) {
      if (error) reject(error)
      if (typeof body === "string") body = JSON.parse(body);
      let bookings = body
      let promises = []
      bookings.forEach((booking) => {
        promises.push(
          new Promise((resolve, reject) => {
            let options = {
                method: 'GET',
                uri: `${endpoint}:${req.session.user.port}/api/EventTimeSlotInstance/${booking.timeslotId}`
            };
            request.get(options, function (error, response, body) {
              if (typeof body === "string") body = JSON.parse(body);
              booking.eventId = body.hajjEventId;
              booking.startTime = body.timeslotInformation.startTime;
              booking.endTime = body.timeslotInformation.endTime;
              booking.newStartTime = body.timeslotInformation.newStartTime;
              booking.newEndTime = body.timeslotInformation.newEndTime;
              resolve()
            })
          })
        )
      })
      Promise.all(promises)
      .then(() => {
        res.send(bookings);
      })
      .catch((err) => {
        res.send({error: err})
      })

    });
  });

  app.use("/endpoints/bookings", router);
}
