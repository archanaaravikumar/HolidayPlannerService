'use strict';
module.exports = function(app) {
  var flightAvailabilityController = require('../controllers/flightAvailabilityController');


  app.route('/flights')
    .get(flightAvailabilityController.fetch_all_flight_options);

};

