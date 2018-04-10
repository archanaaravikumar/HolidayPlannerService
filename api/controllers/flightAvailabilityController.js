 
'use strict';

var mongoose = require('mongoose');
var flightAvailabilityService = require('../services/flightAvailabilityService');


exports.fetch_all_flight_options = function(req, res) {
  console.log("list all flights between given cities");
  var from = req.query.from;
  var to = req.query.to;
  var flightOptions = flightAvailabilityService.fetchFlights(from,to);
  console.log("flights options " + flightOptions);
  res.json(flightOptions);
};