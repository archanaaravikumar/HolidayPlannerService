const axios = require("axios");

var functions = function () {

    function getYMDDate(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return year + (month<=9 ? '0' + month : month) + (day <= 9 ? '0' + day : day);
    }

    const appId = "fee90ad1";
    const appKey = "60acab403a86d82b895c4ad37ba92e8a";

    function getHotelInCity(location) {
        //TODO(Pooja): Fetch cityid based on location from csv file
        const bangaloreCityId = "6771549831164675055";
        const fetchUrl = "http://developer.goibibo.com/api/voyager/get_hotels_by_cityid/?app_id=" + appId +
            "&app_key=" + appKey + "&city_id=" + bangaloreCityId;

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


    function getBuses(from, to, journeyDate) {
       //TODO(Pooja): Add optional roundtrip date
        const busAvailabilityUrl = 'http://developer.goibibo.com/api/bus/search/?app_id=' + appId + '&app_key=' + appKey +
            '&format=json&source=' + from + '&destination=' + to +
            '&dateofdeparture=' + getYMDDate(journeyDate);
        return getData(busAvailabilityUrl);
    }

    function getFlights(from, to, journeyDate) {

        let departureAirportCode = getFlightCode(from);
        let arrivalAirportCode = getFlightCode(to);
        let formattedDate = getYMDDate(journeyDate);
        let flightAvailabilityUrl = 'http://developer.goibibo.com/api/search/?app_id=' + appId + '&app_key=' + appKey +
            '&format=json&source=' + departureAirportCode + '&destination=' + arrivalAirportCode +
            '&dateofdeparture=' + formattedDate + '&seatingclass=E&adults=1&children=0&infants=0&counter=100';
        return getData(flightAvailabilityUrl);
    }

    function getData(url) {
        return new Promise((resolve, reject) => {
            axios
                .get(url)
                .then(response => {
                    if (response.status === 200)
                        return resolve(response.data);
                    return reject(response.statusText);
                })
                .catch(error => {
                    return reject(error);
                });
        });
    }


    function getFlightCode(city) {
        let airports = require('./../../resources/airportlist.json');
        return airports[city];
    }

    return {
        getHotelInCity: getHotelInCity,
        getBuses: getBuses,
        getFlights: getFlights
    }
};


module.exports = functions;