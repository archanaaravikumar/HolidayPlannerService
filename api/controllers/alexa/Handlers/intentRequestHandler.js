function handler(flightAvailabilityService, hotelAvailabilityService, busAvailabilityService, trainAvailabilityService) {

    function handleIntentRequest(request, response) {

        switch (request.body.request.intent.name) {
            case "findhotel":
                handleSearchHotels(request.body.request.intent, (result) => response.json(JSON.parse(result)));
                break;
            case "findflight":
                handleSearchFlights(request.body.request.intent, (result) => response.json(JSON.parse(result)));
                break;
            case "findbus":
                handleSearchBuses(request.body.request.intent, (result) => response.json(JSON.parse(result)));
                break;
            case "findtrain":
                handleSearchTrains(request.body.request.intent, (result) => response.json(JSON.parse(result)));
                break;
            case "AMAZON.HelpIntent":
                handlehelpRequest(request.body.request.intent, (result) => response.json(JSON.parse(result)));
                break;
            default:
                return response.status(404).send("Invalid request!");
                break;
        }
    }

    function handlehelpRequest(intent, next) {
        let result = `
            {
                "version": "1.0",
                "sessionAttributes": { },
                "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "I can find flights, buses, trains, hotels for your vacation. For example Find me a bus from chennai to bangalore, find me a flight from bangalore to london on May 3rd"
                },
                "card": {
                    "type": "Simple",
                    "title": "Hotels",
                    "content": "I can find flights, buses, trains, hotels for your vacation. For example Find me a bus from chennai to bangalore, find me a flight from bangalore to london on May 3rd"
                },
                "shouldEndSession": false
                }
            }`;
        next(result);
    }

    function handleSearchHotels(intent, next) {

        let from = intent.slots.from_date.value;
        let to = intent.slots.to_date.value;
        let location = intent.slots.location.value;

        let hotelOptions = hotelAvailabilityService.fetch(from, to, location);

        console.log("hotels options " + hotelOptions);
        let result = `
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

        let from = intent.slots.from_location.value;
        let to = intent.slots.to_location.value;
        let journeyDate = intent.slots.travel_date.value;

        flightAvailabilityService.fetch(from, to, journeyDate).then(flightOptions => {
            console.log("flights options " + flightOptions);
            let result = `
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
        });


    }

    function handleSearchBuses(intent, next) {

        let from = intent.slots.from_location.value;
        let to = intent.slots.to_location.value;
        let journeyDate = intent.slots.journey_date.value;

        let busOptions = busAvailabilityService.fetch(from, to, journeyDate);

        console.log("bus options " + busOptions);
        let result = `
            {
                "version": "1.0",
                "sessionAttributes": { },
                "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "${busOptions} are available"
                },
                "card": {
                    "type": "Simple",
                    "title": "Buses",
                    "content": "${busOptions} are available"
                },
                "shouldEndSession": true
                }
            }`;
        next(result);
    }

    function handleSearchTrains(intent, next) {

        let from = intent.slots.from_location.value;
        let to = intent.slots.to_location.value;
        let journeyDate = intent.slots.journey_date.value;

        let trainOptions = trainAvailabilityService.fetch(from, to, journeyDate);

        console.log("train options " + trainOptions);
        let result = `
            {
                "version": "1.0",
                "sessionAttributes": { },
                "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "${trainOptions} are available"
                },
                "card": {
                    "type": "Simple",
                    "title": "Trains",
                    "content": "${trainOptions} are available"
                },
                "shouldEndSession": true
                }
            }`;
        next(result);
    }

    return {
        handle: handleIntentRequest
    }
}

module.exports = handler;