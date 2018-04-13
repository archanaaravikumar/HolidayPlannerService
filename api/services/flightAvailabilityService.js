var functions = function (gatewayService) {

	var fetch = function (from, to, journeyDate) {
		console.log("Fetching flights");
		gatewayService.getFlights(from, to, journeyDate).then((result) => {
            let flights = [];
            console.log(result);
            const onwardFlights = result.data.onwardflights;

            if (!onwardFlights || !onwardFlights.length)
                return flights;

            onwardFlights.slice(0, 5).forEach(element => {
                let item = `${element.airline} departs at ${element.deptime} and arrives on ${element.arrdate} for ${element.fare.totalfare} Rupees`;
                flights.push(item);
            });
            return flights;
		});
	};

	return {
		fetch: fetch
	}
}

module.exports = functions;