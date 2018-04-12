'use strict';

module.exports = function (app) {
    var gatewayService = require('../services/goibiboGatewayService')();
    var hotelAvailabilityService = require('../services/hotelAvailabilityService')(gatewayService);
    var flightAvailabilityService = require('../services/flightAvailabilityService')();
    var busAvailabilityService = require('../services/busAvailabilityService')();
    var trainAvailabilityService = require('../services/trainAvailabilityService')();

    var alexaController = require('../controllers/alexa/alexaController')(flightAvailabilityService, hotelAvailabilityService, busAvailabilityService, trainAvailabilityService);
    app.route('/alexa').post(alexaController.handleRequest);
};

