'use strict';

module.exports = function (app) {

    var gatewayService = require('../services/goibiboGatewayService')();
    var hotelAvailabilityService = require('../services/hotelAvailabilityService')(gatewayService);
    var flightAvailabilityService = require('../services/flightAvailabilityService')(gatewayService);
    var busAvailabilityService = require('../services/busAvailabilityService')(gatewayService);
    var trainAvailabilityService = require('../services/trainAvailabilityService')(gatewayService);

    var intentRequestHandler = require('../controllers/alexa/Handlers/intentRequestHandler')(flightAvailabilityService, hotelAvailabilityService, busAvailabilityService, trainAvailabilityService);
    var launchRequestHandler = require('../controllers/alexa/Handlers/launchRequestHandler')();
    var sessionEndRequestHandler = require('../controllers/alexa/Handlers/sessionEndRequestHandler')();
    var reqeustHandlerFactory = require('../controllers/alexa/Handlers/requestHandlerFactory')(intentRequestHandler, launchRequestHandler, sessionEndRequestHandler);
    var alexaController = require('../controllers/alexa/alexaController')(reqeustHandlerFactory);

    app.route('/alexa').post(alexaController.handleRequest);
};

