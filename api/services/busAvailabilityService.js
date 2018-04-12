var functions = function (gatewayService) {

    function fetch(from, to, journeyDate) {
        console.log("Fetching buses");
        var result = gatewayService.getBuses(from, to, journeyDate);
        let buses = [];
        const onwardFlights = result.data.onwardflights;

        if (!onwardFlights || !onwardFlights.length)
            return buses;

        onwardFlights.slice(0, 5).forEach(element => {
            buses.push(`${element.TravelsName} ${element.BusType} starts at ${element.DepartureTime} for ${element.fare.totalfare} Rupees`);
        });

        return buses;
    };

    return {
        fetch: fetch
    }
};

module.exports = functions;


