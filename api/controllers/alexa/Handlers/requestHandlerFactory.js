
function requestHandlerFactory(handleIntentRequestHandler, handleLaunchRequestHandler, sessionEndRequestHandler) {
    function get(intentType) {
        switch (intentType) {
            case 'IntentRequest':
                return handleIntentRequestHandler;
            case 'LaunchRequest':
                return handleLaunchRequestHandler;
            case 'SessionEndRequest':
                return sessionEndRequestHandler;
            default:
                return;
        }
    }
    return {
        get: get
    }
}

module.exports = requestHandlerFactory;