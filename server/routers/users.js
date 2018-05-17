var express = require('express');

module.exports = function(app, request, {endpoint, users}) {
  let router = express.Router();

  router.get('/authenticate', function (req, res, next) {
    if (!req.session.user) res.redirect('/login');
  });

  router.post('/login', function (req, res) {
    console.log('BE logging in ', req.body.email)
    console.log(`${endpoint}:${users.admin}/api/AgencyRep/${req.body.email}`)
      var options = {
          method: 'GET',
          uri: `${endpoint}:${users.admin}/api/AgencyRep/${req.body.email}`,
          json: true
      };
      request.get(options, function (error, response, body) {
          if (response.statusCode === 404) res.status(200).send({error: 'Wrong username & password'});
          else {
            if (typeof body === "string") body = JSON.parse(body);
            console.log('user: ', req.body.email, users[body.userId])
            console.log('body: ', body)
            console.log('users: ', users)
            let populateUserProfile = new Promise((resolve, reject) => {
              let eventBookingIds = []
              body.eventBookings.forEach((booking) => {
                eventBookingIds.push(booking.substring(booking.indexOf('#')+1, booking.length))
              })

              req.session.user = {
                userId: body.userId,
                firstName: body.firstName,
                lastName: body.lastName,
                port: users[body.userId],
                eventBookingIds: eventBookingIds
              }
              resolve();
            })

            let populateEvents = new Promise((resolve, reject) => {
              var options = {
                  method: 'GET',
                  uri: `${endpoint}:${users[body.userId]}/api/HajjEvent`
              };
              request.get(options, function (error, response, body) {
                if (error) reject(error)
                console.log('events', body)
                if (typeof body === "string") body = JSON.parse(body);
                req.session.events = body
                resolve();
              });
            })

            Promise.all([populateUserProfile, populateEvents])
            .then(() => {
              console.log('Returning: ', req.session.user)
              res.status(200).send(req.session.user);
            })
            .catch((errors) => {
              console.log(errors)
              res.status(200).send({error: 'Something went wrong. Please try again later'});
            })
          }
      });
  });

  router.get('/logout', function (req, res) {
      res.cookie("connect.sid", "", {expires: new Date()});
      req.session.destroy(function (err) {
          console.log('Logged out');
          if (process.env.NODE_ENV === 'production') res.redirect('/login');
          res.send('Logged out');
      });
  });

  router.get('/session', function (req, res) {
    if (process.env.NODE_ENV === 'production' && !req.session.user) res.redirect('/login');
    res.send(req.session)
  });

  router.get('/', function(req, res, next) {
    if (process.env.NODE_ENV === 'production' && !req.session.user) res.redirect('/login');
    console.log('Getting stored user data')
    res.send(req.session.user)
  });

  app.use("/endpoints/user", router);

}
