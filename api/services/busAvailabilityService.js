var functions = function (gatewayService) {

    function fetch(from, to, journeyDate) {
        console.log("Fetching buses");

        return new Promise(function executor(resolve, reject) {

            gatewayService.getBuses(from, to, journeyDate).then(result => {
                console.log(result);
                let buses = [];
                const onwardBuses = result.data.onwardflights;

                if (!onwardBuses || !onwardBuses.length)
                    return resolve(buses);

                onwardBuses.slice(0, 5).forEach(element => {
                    buses.push(`${element.TravelsName} ${element.BusType} starts at ${element.DepartureTime} for ${element.fare.totalfare} Rupees`);
                });
                return resolve(buses);

            }).catch((error) => {
                return reject("Something went wrong! please try again. For example, find me a bus from chennai to bangalore")
            });
        });
    }

    return {
        fetch: fetch
    }
};

module.exports = functions;


