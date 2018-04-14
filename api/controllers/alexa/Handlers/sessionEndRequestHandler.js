function sessionEndRequestHandler() {
    const END_GREETING_WORDS = 'Goodbye! Thank you for using holiday planner! Look forward to help you for the next trip.'

    function sessionEndRequest(request, response) {
        let result =
            {
                "version": "1.0",
                "sessionAttributes": {},
                "response": {
                    "outputSpeech": {
                        "type": "PlainText",
                        "text": END_GREETING_WORDS
                    },
                    "card": {
                        "type": "Simple",
                        "title": "Info",
                        "content": END_GREETING_WORDS
                    },
                    "shouldEndSession": true
                }
            };
        return response.json(JSON.parse(result))
    }

    return {
        handle: sessionEndRequest
    }
}

module.exports = sessionEndRequestHandler;