
function requestHandlerFactory(handleIntentRequest, handleLaunchRequest) {
    function get(intentType) {
        switch (intentType) {
            case 'IntentRequest':
                return handleIntentRequest;
            case 'LaunchRequest':
                return handleLaunchRequest;
            default:
                return;
        }
    }
    return {
        get: get
    }
}

module.exports = requestHandlerFactory;