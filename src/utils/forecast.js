const request = require("postman-request");
const access_key = "21eee342ff82caa557cecf333851e5de"
const degreesMap = {
    s: "Kelvin",
    m: "Celcius",
    f: "Farenheit"
}
const degreeOption = "m";
const forecast = ({latitude, longitude, location} = {}, callBack) => {
    const myGeoCode = encodeURIComponent(`${latitude},${longitude}`);
    const weatherUrl = `http://api.weatherstack.com/current?access_key=${access_key}&query=${myGeoCode}&units=${degreeOption}`;
    
    request({url: weatherUrl, json: true}, (err, response) => {
        if(err) {
            return callBack("Unable to connect to WeatherStack!");
        } else if (response.body.error) {
            if (response.body.error.code === 615) return callBack("WeatherStack: API request failed. Please try again or contact support.");
            return callBack("Unable to find location!");
        };
        const {weather_descriptions: weatherDescriptions, temperature, feelslike} = response.body.current;
        const info = {
            location: location,
            forecast: `${weatherDescriptions[0]}. It is ${temperature} ${degreesMap[degreeOption]}, feels like ${feelslike} ${degreesMap[degreeOption]}`,

        }
        return callBack(undefined, info);
        // return callBack(undefined,`${location}: ${weatherDescriptions[0]}. It is ${temperature} ${degreesMap[degreeOption]}, feels like ${feelslike} ${degreesMap[degreeOption]}`);
    });
}

module.exports = forecast;