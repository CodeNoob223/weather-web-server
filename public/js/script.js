console.log("Client side javascript is loaded!");

const weatherInput = document.getElementById("weather-input");
const weatherForm = document.getElementById("weather-form");
const weatherForecast = document.getElementById("weather-forecast");
const weatherLocation = document.getElementById("weather-location");
const weatherAddress = document.getElementById("weather-address");

const loadingIcon = document.querySelector(".loadingIcon");
const errorIcon = document.querySelector(".errorIcon");

const fetchData = async (apiLink) => {
    const response = await fetch(apiLink);
    const data = response.json();
    console.log(data);
    return data;
};

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    weatherLocation.textContent = "";
    weatherAddress.textContent = "";
    weatherForecast.textContent = "";
    errorIcon.classList.add("hidden");
    loadingIcon.classList.remove("hidden");
    const address = encodeURI(weatherInput.value);
    
    fetchData(`https://mqweather.cyclic.app/weather?address=${address}`).then(
        (data = {}) => {
            if (data.error || !data.location) {
                weatherLocation.textContent = data.error;
                loadingIcon.classList.add("hidden");
                return errorIcon.classList.remove("hidden");
            }
            loadingIcon.classList.add("hidden");
            weatherLocation.textContent = `Location: ${data.location}`;
            weatherAddress.textContent = `Address: ${data.address}`;
            weatherForecast.textContent = `Forecast: ${data.forecast}`;
    }).catch(err => {console.log(err)}); 
});
