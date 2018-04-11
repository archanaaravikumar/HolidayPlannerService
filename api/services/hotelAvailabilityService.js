
var functions = function (gatewayService) {

    function fetch(from, to, location) {
        console.log("Fetching hotels");
        return ["Taj", "Novotel"];
    };

    return {
        fetch: fetch
    }

};


module.exports = functions;