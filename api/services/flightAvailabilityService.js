var functions = function (gatewayService) {

    var fetch = function (from, to, journeyDate) {

        return new Promise(function executor(resolve, reject) {
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
                return resolve(flights);
            }).catch((error) => {
                return reject("Something went wrong! please try again. For example, find me a flight from chennai to bangalore")
            });
        });
    };

    return {
        fetch: fetch
    }
}

module.exports = functions;