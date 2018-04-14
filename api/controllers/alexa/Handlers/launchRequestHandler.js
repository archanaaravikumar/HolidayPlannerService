function launchRequestHandler() {
    const WELCOME_MESSAGE = "Welcome to holiday planner. I can find flights and buses for your vacation. For example, Find me a bus from chennai to bangalore";
    const HELP_MESSAGE = "I can find flights and buses for your vacation. For example find me a bus from chennai to bangalore, find me a flight from bangalore to london";

    function handleLaunchRequest(request, response) {
        let result =
            {
                "version": "1.0",
                "sessionAttributes": {},
                "response": {
                    "outputSpeech": {
                        "type": "PlainText",
                        "text": WELCOME_MESSAGE
                    },
                    "card": {
                        "type": "Simple",
                        "title": "Info",
                        "content": WELCOME_MESSAGE
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
        return response.json(JSON.parse(result))
    }

    return {
        handle: handleLaunchRequest
    }
}

module.exports = launchRequestHandler;