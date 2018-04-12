const axios = require("axios");

var functions = function () {

    const appId = "fee90ad1";
    const appKey = "60acab403a86d82b895c4ad37ba92e8a";

    function getHotelInCity(location) {
        //TODO(Pooja): Fetch cityid based on location from csv file
        const bangaloreCityId = "6771549831164675055";
        const fetchUrl = "http://developer.goibibo.com/api/voyager/get_hotels_by_cityid/?app_id=" + appId +
            "&app_key=" + appKey + "&city_id=" +  bangaloreCityId;

        console.log("Fetching hotels");

        axios
            .get(fetchUrl)
            .then(response => {
                console.log(`Respone : ${response.data.data} -`);
            })
            .catch(error => {
                console.log(error);
            });
        return ["Ibis", "Novotel"];
    };

    return {
        getHotelInCity: getHotelInCity
    }

};


module.exports = functions;