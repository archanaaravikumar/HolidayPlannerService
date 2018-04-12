var functions = function (gatewayService) {

	var fetch = function (from, to, journeyDate) {
		console.log("Fetching flights");
		let result = gatewayService.getFlights(from, to, journeyDate);
		let flights = [];
		const onwardFlights = result.data.onwardflights;

		if (!onwardFlights || !onwardFlights.length)
			return flights;

		onwardFlights.slice(0, 5).forEach(element => {
			flights.push(`${element.airline} departs at ${element.deptime} and arrives on ${element.arrdate} for ${element.fare.totalfare} Rupees`);
		});

		return flights;
	};

	return {
		fetch: fetch
	}
}

module.exports = functions;