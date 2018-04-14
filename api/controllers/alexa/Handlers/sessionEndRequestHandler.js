function sessionEndRequestHandler() {

    function sessionEndRequest(request, response) {
        let result = `
            {
                "version": "1.0",
                "sessionAttributes": { },
                "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "Goodbye. Happy to serve you for your next trip!"
                },
                "card": {
                    "type": "Simple",
                    "title": "Hotels",
                    "content": "Goodbye. Happy to serve you for your next trip!"
                },
                "shouldEndSession": false
                }
            }`;
        return response.json(JSON.parse(result))
    }

    return {
        handle: sessionEndRequest
    }
}

module.exports = sessionEndRequestHandler;