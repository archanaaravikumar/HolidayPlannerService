var functions = function (gatewayService) {

    function fetch(from, to, location) {
        return gatewayService.getHotelInCity(location);
    }

    return {
        fetch: fetch
    }

};

module.exports = functions;