
var functions = function (gatewayService) {

    function fetch(from, to, location) {
        console.log("Fetching trains");
        return ["Podhigai at 5 PM from tambram", "Pandiyan at 3.30 PM from central"];
    };

    return {
        fetch: fetch
    }
};

module.exports = functions;