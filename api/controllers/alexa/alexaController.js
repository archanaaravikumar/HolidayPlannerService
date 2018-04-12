'use strict';

let actions = function (requestHandlerFactory) {

    let handleRequest = function (request, response) {

        let handler = requestHandlerFactory.get(request.body.request.type);

        if (!handler) {
            return response.status(500).send("Invalid intent type");
        }

        handler.handle(request, response);
    };

    return {
        handleRequest: handleRequest
    }
}

module.exports = actions;