var mongoose = require('mongoose');
var _ = require('underscore');

var functions = function (gatewayService) {

	var fetch = function (from, to) {
		console.log("Fetching flights");
		return ["indigo at 3 PM", "jetAirways at 5 PM"];
	};

	return {
		fetch: fetch
	}
}

module.exports = functions;