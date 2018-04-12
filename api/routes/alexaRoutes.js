'use strict';

module.exports = function (app) {
    var gatewayService = require('../services/goibiboGatewayService')();
    var hotelAvailabilityService = require('../services/hotelAvailabilityService')(gatewayService);
    var flightAvailabilityService = require('../services/flightAvailabilityService')(gatewayService);
    var busAvailabilityService = require('../services/busAvailabilityService')(gatewayService);
    var trainAvailabilityService = require('../services/trainAvailabilityService')(gatewayService);

    var alexaController = require('../controllers/alexa/alexaController')(flightAvailabilityService, hotelAvailabilityService, busAvailabilityService, trainAvailabilityService);
    app.route('/alexa').post(alexaController.handleRequest);
};

