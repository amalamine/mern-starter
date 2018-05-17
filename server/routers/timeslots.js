var express = require('express');

module.exports = function(app, request, {endpoint}) {

  var router = express.Router();

  router.get('/', function(req, res, next) {
    if (process.env.NODE_ENV === 'production' && !req.session.user) res.redirect('/login');
    console.log('Fetching timeslots for ', req.query.eventId)
    var options = {
        method: 'GET',
        uri: `${endpoint}:${req.session.user.port}/api/queries/GetEventTimeSlotInstances`,
        qs: {eventId: req.query.eventId}
    };
    request.get(options, function (error, response, body) {
      if (error) res.status(200).send(error);
      console.log(body)
      if (typeof body === "string") body = JSON.parse(body);
      res.send(body)
    });
  });

  router.post('/book', function(req, res, next) {
    if (process.env.NODE_ENV === 'production' && !req.session.user) res.status(500).send('Unauthenticated');
    var options = {
        method: 'POST',
        uri: `${endpoint}:${req.session.user.port}/api/SignUpForTimeslot`,
        body: req.body,
        json: true
    };
    request.post(options, function (error, response, body) {
      console.log('Booking: ', body)
      if (error) res.status(500).send(error);
      else res.status(200).send('Timeslot booking confirmed!')
    });
  });

  router.post('/cancel', function(req, res, next) {
    if (process.env.NODE_ENV === 'production' && !req.session.user) res.status(500).send('Unauthenticated');
    var options = {
        method: 'POST',
        uri: `${endpoint}:${req.session.user.port}/api/CancelTimeslot`,
        body: req.body,
        json: true
    };
    request.post(options, function (error, response, body) {
      console.log('canceled ', req.body)
      if (error) res.status(500).send(error);
      else res.status(200).send('Timeslot booking canceled!')
    });
  });

  router.post('/checkin', function(req, res, next) {
    if (process.env.NODE_ENV === 'production' && !req.session.user) res.status(500).send('Unauthenticated');
    var options = {
        method: 'POST',
        uri: `${endpoint}:${req.session.user.port}/api/CheckInToEvent`,
        body: req.body,
        json: true
    };
    request.post(options, function (error, response, body) {
      console.log('checkedin ', req.body)
      if (error) res.status(500).send(error);
      else res.status(200).send('Successfully checked in!')
    });
  });

  router.post('/checkout', function(req, res, next) {
    if (process.env.NODE_ENV === 'production' && !req.session.user) res.status(500).send('Unauthenticated');
    var options = {
        method: 'POST',
        uri: `${endpoint}:${req.session.user.port}/api/CheckOutOfEvent`,
        body: req.body,
        json: true
    };
    request.post(options, function (error, response, body) {
      console.log('checkedout ', req.body)
      if (error) res.status(500).send(error);
      else res.status(200).send('Successfully checked out!')
    });
  });

  app.use("/endpoints/timeslots", router);

}
