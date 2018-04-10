'use strict';

module.exports = function (app) {
    var flightAvailabilityService = require('../services/flightAvailabilityService');
    var alexaController = require('../controllers/alexa/alexaController')(flightAvailabilityService);

    app.route('/alexa').post(alexaController.handleRequest);
};

