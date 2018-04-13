var functions = function (gatewayService) {

    function fetch(from, to, journeyDate) {
        console.log("Fetching buses");
        return gatewayService.getBuses(from, to, journeyDate).then(result => {
            let buses = [];
            const onwardBuses = result.data.onwardflights;

            if (!onwardBuses || !onwardBuses.length)
                return buses;

            onwardBuses.slice(0, 5).forEach(element => {
                buses.push(`${element.TravelsName} ${element.BusType} starts at ${element.DepartureTime} for ${element.fare.totalfare} Rupees`);
            });

            return buses;
        });
    }

    return {
        fetch: fetch
    }
};

module.exports = functions;


