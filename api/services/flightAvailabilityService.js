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
                    var arrivalDateString = `${element.arrdate.substr(0, element.arrdate.length - 2)}:${element.arrdate.substr(element.arrdate.length - 2)}`
                    let flight = `${element.airline} departs at ${element.deptime} and arrives on ${new Date(Date.parse(arrivalDateString))} for ${element.fare.totalfare} Rupees`;
                    flights.push(flight);
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