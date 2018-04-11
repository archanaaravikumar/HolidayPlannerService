'use strict';

var actions = function (flightAvailabilityService, hotelAvailabilityService) {

    var handleRequest = function (request, response) {

        if (request.body.request.type !== "IntentRequest") {
            return response.status(500).send("Invalid intent type");
        }

        switch (request.body.request.intent.name) {
            case "findhotel":
                handleSearchHotels(request.body.request.intent, (result) => response.json(JSON.parse(result)));
                break;
            case "findflight":
                handleSearchFlights(request.body.request.intent, (result) => response.json(JSON.parse(result)));
             break;
            default:
                break;
        }
    };

    function handleSearchHotels(intent, next) {
        var from = intent.slots.from_date;
        var to = intent.slots.to_date;
        var location = intent.slots.location;
        var hotelOptions = hotelAvailabilityService.fetch(from, to, location);
        console.log("flights options " + hotelOptions);
        var result = `
            {
                "version": "1.0",
                "sessionAttributes": { },
                "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "${hotelOptions} are available"
                },
                "card": {
                    "type": "Simple",
                    "title": "Hotels",
                    "content": "${hotelOptions} are available"
                },
                "shouldEndSession": true
                }
            }`;
        next(result);
    }

    function handleSearchFlights(intent, next) {

        var from = intent.slots.from_location;
        var to = intent.slots.to_location;

        var flightOptions = flightAvailabilityService.fetch(from, to);

        console.log("flights options " + flightOptions);
        var result = `
            {
                "version": "1.0",
                "sessionAttributes": { },
                "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "${flightOptions} are available"
                },
                "card": {
                    "type": "Simple",
                    "title": "Flights",
                    "content": "${flightOptions} are available"
                },
                "shouldEndSession": true
                }
            }`;
        next(result);
    }

    return {
        handleRequest: handleRequest
    }
}

module.exports = actions;