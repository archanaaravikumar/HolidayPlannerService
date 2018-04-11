'use strict';

module.exports = function (app) {
    var flightAvailabilityService = require('../services/flightAvailabilityService');
    var hotelAvailabilityService = require('../services/hotelAvailabilityService')();
    
    var alexaController = require('../controllers/alexa/alexaController')(flightAvailabilityService, hotelAvailabilityService);

    app.route('/alexa').post(alexaController.handleRequest);
};

