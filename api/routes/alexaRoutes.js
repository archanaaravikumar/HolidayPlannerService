'use strict';

module.exports = function (app) {
    var hotelAvailabilityService = require('../services/hotelAvailabilityService')();
    var flightAvailabilityService = require('../services/flightAvailabilityService')();
    var busAvailabilityService = require('../services/busAvailabilityService')();
    var trainAvailabilityService = require('../services/trainAvailabilityService')();

    var alexaController = require('../controllers/alexa/alexaController')(flightAvailabilityService, hotelAvailabilityService, busAvailabilityService, trainAvailabilityService);

    app.route('/alexa').post(alexaController.handleRequest);
};

