var functions = function (gatewayService) {

    function fetch(from, to, location) {
        console.log("Fetching buses");
        return ["Parveen travels at 5 PM from st johns", "Orange travels at 5.15 from st johns"];
    };

    return {
        fetch: fetch
    }
};

module.exports = functions;