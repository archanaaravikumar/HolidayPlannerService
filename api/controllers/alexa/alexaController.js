'use strict';

var actions = function (flightAvailabilityService) {

  var handleRequest = function (request, response) {

    var flightOptions = flightAvailabilityService.fetchFlights("from", "to");
    console.log("flights options " + flightOptions);
    var result = `
    {
     "version": "1.0",
     "sessionAttributes": { },
     "response": {
       "outputSpeech": {
         "type": "PlainText",
         "text": "${flightOptions}"
       },
       "card": {
         "type": "Simple",
         "title": "Hello",
         "content": "Simple card to say hello"
       },
       "shouldEndSession": true
      }
    }`;
    response.json(JSON.parse(result));
  };

  return {
    handleRequest: handleRequest
  }
}

module.exports = actions;