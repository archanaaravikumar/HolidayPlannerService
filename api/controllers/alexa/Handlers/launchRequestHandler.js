function launchRequestHandler() {

    function handleLaunchRequest(request, response) {
        let result = `
            {
                "version": "1.0",
                "sessionAttributes": { },
                "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "Welcome to holiday planner. I can find flights, buses, trains, hotels for your vacation. For e.g Find me a bus from chennai to bangalore"
                },
                "card": {
                    "type": "Simple",
                    "title": "Hotels",
                    "content": "Welcome to holiday planner. I can find flights, buses, trains, hotels for your vacation. For e.g Find me a bus from chennai to bangalore"
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