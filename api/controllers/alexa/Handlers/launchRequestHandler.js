function launchRequestHandler() {

    function handleLaunchRequest(request, response) {
        let result = `
            {
                "version": "1.0",
                "sessionAttributes": { },
                "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "Welcome to holiday planner. I can find flights and buses for your vacation. For example, Find me a bus from chennai to bangalore"
                },
                "card": {
                    "type": "Simple",
                    "title": "Hotels",
                    "content": "Welcome to holiday planner. I can find flights and buses for your vacation. For example, find me a bus from chennai to bangalore"
                },
                "reprompt": {
                    "outputSpeech": {
                      "type": "PlainText",
                      "text": "I can find flights and buses for your vacation. For example Find me a bus from chennai to bangalore, find me a flight from bangalore to london on May 3rd"
                    }
                },
                "shouldEndSession": false
                }
            }`;
        return response.json(JSON.parse(result))
    }

    return {
        handle: handleLaunchRequest
    }
}

module.exports = launchRequestHandler;