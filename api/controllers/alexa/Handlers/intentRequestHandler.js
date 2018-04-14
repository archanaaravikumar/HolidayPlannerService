function handler(flightAvailabilityService, hotelAvailabilityService, busAvailabilityService, trainAvailabilityService) {

    const dateFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const endGreetingWords = 'Thank you for using holiday planner! Look forward to help you for the next trip.'
    const localeCulture = 'en-IN';
    
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
                    "text": "${hotelOptions}"
                },
                "card": {
                    "type": "Simple",
                    "title": "Hotels",
                    "content": "${hotelOptions}"
                },
                "shouldEndSession": true
                }
            }`;
        next(result);
    }

    function isMorethanOne(values)
    {
        return values && values.length && values.length > 1;
    }

    function handleSearchFlights(intent, next) {

        let from = intent.slots.from_location.value;
        let to = intent.slots.to_location.value;
        let journeyDate = intent.slots.travel_date.value ? new Date(intent.slots.travel_date.value) : new Date();

        flightAvailabilityService.fetch(from, to, journeyDate).then(flightOptions => {
            console.log("flights options: " + flightOptions);

            let responseText = `Sorry, no flights are available on ${journeyDate.toLocaleDateString(localeCulture, dateFormatOptions)} from ${from} to ${to}. ${endGreetingWords}`;
            if (flightOptions && flightOptions.length)
               responseText = `${flightOptions} ${isMorethanOne(flightOptions) ? "are" : "is"} available. ${endGreetingWords}`;

            let result = `
            {
                "version": "1.0",
                "sessionAttributes": { },
                "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "${responseText}"
                },
                "card": {
                    "type": "Simple",
                    "title": "Flights",
                    "content": "${responseText}"
                },
                "shouldEndSession": true
                }
            }`;
            next(result);
        }).catch(error => {
            let result = `
            {
                "version": "1.0",
                "sessionAttributes": { },
                "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "${error}"
                },
                "card": {
                    "type": "Simple",
                    "title": "Flights",
                    "content": "${error}"
                },
                "shouldEndSession": false
                }
            }`;
            next(result);
        });
    }

    function handleSearchBuses(intent, next) {

        let from = intent.slots.from_location.value;
        let to = intent.slots.to_location.value;
        let journeyDate = intent.slots.journey_date.value ? new Date(intent.slots.journey_date.value) : new Date();

        let busOptions = busAvailabilityService.fetch(from, to, journeyDate).then(busOptions => {

            console.log("bus options " + busOptions);
            let responseText = `Sorry, no buses are available on ${journeyDate.toLocaleDateString(localeCulture, dateFormatOptions)} from ${from} to ${to}. ${endGreetingWords}`;
            if (busOptions && busOptions.length)
               responseText = `${busOptions} ${isMorethanOne(busOptions) ? "are" : "is"} available. ${endGreetingWords}`;

            let result = `
            {
                "version": "1.0",
                "sessionAttributes": { },
                "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "${responseText}"
                },
                "card": {
                    "type": "Simple",
                    "title": "Buses",
                    "content": "${responseText}"
                },
                "shouldEndSession": true
                }
            }`;
            next(result);
        }).catch(error => {
            let result = `
            {
                "version": "1.0",
                "sessionAttributes": { },
                "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "${error}"
                },
                "card": {
                    "type": "Simple",
                    "title": "Buses",
                    "content": "${error}"
                },
                "shouldEndSession": false
                }
            }`;
            next(result);
        });
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
                    "text": "${trainOptions}"
                },
                "card": {
                    "type": "Simple",
                    "title": "Trains",
                    "content": "${trainOptions}"
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