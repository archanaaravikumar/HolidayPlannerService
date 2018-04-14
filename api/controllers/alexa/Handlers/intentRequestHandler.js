function handler(flightAvailabilityService, hotelAvailabilityService, busAvailabilityService, trainAvailabilityService) {

    const DATE_FORMAT_OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const END_GREETING_WORDS = 'Goodbye! Thank you for using holiday planner! Look forward to help you for the next trip.'
    const LOCAL_CULTURE = 'en-IN';
    const INVALID_REQEST_RESPONSE_TEXT = "Sorry, can't understand the request. I can find flights and buses for your vacation. For example, find me a flight from bangalore to london";
    const HELP_MESSAGE = "I can find flights and buses for your vacation. For example find me a bus from chennai to bangalore, find me a flight from bangalore to london";

    function handleIntentRequest(request, response) {
        switch (request.body.request.intent.name) {
            case "findhotel":
                handleSearchHotels(request.body.request.intent, (result) => response.json(result));
                break;
            case "findflight":
                handleSearchFlights(request.body.request.intent, (result) => response.json(result));
                break;
            case "findbus":
                handleSearchBuses(request.body.request.intent, (result) => response.json(result));
                break;
            case "findtrain":
                handleSearchTrains(request.body.request.intent, (result) => response.json(result));
                break;
            case "AMAZON.HelpIntent":
                handleHelpRequest((result) => response.json(result));
                break;
            case "AMAZON.CancelIntent":
            case "AMAZON.StopIntent":
                handleCancelRequest((result) => response.json(result));
                break;
            default:
                return response.status(404).send("Invalid request!");
                break;
        }
    }

    function handleHelpRequest(next) {
        next(getHelpMessage(HELP_MESSAGE));
    }

    function handleCancelRequest(next) {
        next(getResponseMessage(END_GREETING_WORDS, "Goodbye"));
    }

    function handleSearchHotels(intent, next) {

        let from = intent.slots.from_date.value;
        let to = intent.slots.to_date.value;
        let location = intent.slots.location.value;

        let hotelOptions = hotelAvailabilityService.fetch(from, to, location);

        console.log("hotels options " + hotelOptions);
        next(getResponseMessage(`${hotelOptions}`));
    }

    function handleSearchFlights(intent, next) {

        if (!isValidRequest(intent)) {
            return next(getHelpMessage(INVALID_REQEST_RESPONSE_TEXT));
        }

        let from = intent.slots.from_location.value;
        let to = intent.slots.to_location.value;
        let journeyDate = intent.slots.travel_date.value ? new Date(intent.slots.travel_date.value) : new Date();

        flightAvailabilityService.fetch(from, to, journeyDate).then(flightOptions => {
            console.log("flights options: " + flightOptions);
            next(getResponseMessage(formatResponse(flightOptions, "flights", from, to, journeyDate), "flights"));
        }).catch(error => {
            next(getHelpMessage(error));
        });
    }

    function handleSearchBuses(intent, next) {

        if (!isValidRequest(intent)) {
            return next(getHelpMessage(INVALID_REQEST_RESPONSE_TEXT));
        }

        let from = intent.slots.from_location.value;
        let to = intent.slots.to_location.value;
        let journeyDate = intent.slots.journey_date.value ? new Date(intent.slots.journey_date.value) : new Date();

        let busOptions = busAvailabilityService.fetch(from, to, journeyDate).then(busOptions => {
            console.log("bus options " + busOptions);
            next(getResponseMessage(formatResponse(busOptions, "buses", from, to, journeyDate), "buses"));
        }).catch(error => {
            next(getHelpMessage(error));
        });
    }

    function handleSearchTrains(intent, next) {

        let from = intent.slots.from_location.value;
        let to = intent.slots.to_location.value;
        let journeyDate = intent.slots.journey_date.value;

        let trainOptions = trainAvailabilityService.fetch(from, to, journeyDate);
        console.log("train options " + trainOptions);
        next(getResponseMessage(`${trainOptions}`));
    }

    function isMorethanOne(values) {
        return values && values.length && values.length > 1;
    }

    function isValidRequest(intent) {
        return intent.slots.from_location.value && intent.slots.to_location.value;
    }

    function formatResponse(commuteValues, commuteType, from, to, journeyDate) {
        let responseText = `Sorry, no ${commuteType} are available on ${journeyDate.toLocaleDateString(LOCAL_CULTURE, DATE_FORMAT_OPTIONS)} from ${from} to ${to}. ${END_GREETING_WORDS}`;
        if (commuteValues && commuteValues.length) {
            responseText = `${commuteValues} ${isMorethanOne(commuteValues) ? "are" : "is"} available. ${END_GREETING_WORDS}`;
        }
        return responseText;
    }

    function getResponseMessage(responseText, title) {
        return {
            "version": "1.0",
            "sessionAttributes": {},
            "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": responseText
                },
                "card": {
                    "type": "Simple",
                    "title": title,
                    "content": responseText
                },
                "shouldEndSession": true
            }
        };
    }

    function getHelpMessage(error) {
        return {
            "version": "1.0",
            "sessionAttributes": {},
            "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": error
                },
                "card": {
                    "type": "Simple",
                    "title": "Info",
                    "content": error
                },
                "reprompt": {
                    "outputSpeech": {
                        "type": "PlainText",
                        "text": HELP_MESSAGE
                    }
                },
                "shouldEndSession": false
            }
        };
    }

    return {
        handle: handleIntentRequest
    }
}

module.exports = handler;