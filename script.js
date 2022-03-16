const input = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const cityOutput = document.querySelector(".city-name");
const dateOutput = document.querySelector(".date");

//current weather data selectors
const tempOutput = document.querySelector(".current-temp");
const descOutput = document.querySelector(".description")
const uvOutput = document.querySelector(".uv-index");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const feelsLikeOutput = document.querySelector(".feels-like")

const key = "66c87a27c099bc7c4716aa574eadefef";

document.addEventListener("DOMContentLoaded", convertToCoordinates("New York"))

searchBtn.addEventListener("click", function() {
    const cityname = input.value;
    console.log(cityname)
    convertToCoordinates(cityname);
})

function convertToCoordinates(city) {
    // convert city name to coordinates - needed to use one call api
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`

    fetch(geocodingUrl)
    .then(result => result.json())
    .then(data => {
        // console.log(data[0])
        const { lat, lon, name} = data[0];
        
        getWeatherData(lat,lon,name)
    })

}

function getWeatherData(lat, lon, name) {
    // one call api - exclude hourly & minutely 
    // https://api.openweathermap.org/data/2.5/onecall?lat=51.5073&lon=-0.1276&exclude=hourly,minutely&appid=66c87a27c099bc7c4716aa574eadefef
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=${key}`

    // cityOutput.textContent = name;
    
    fetch(oneCallUrl)
        .then(result => result.json())
        .then(data => displayWeatherData(data, name))
}

function displayWeatherData(data,name) {
    const date = getCurrentDate();
    const { current, daily } = data;

    // current weather data
    const { temp, uvi, wind_speed, humidity, feels_like, weather } = current;
    const { icon, description } = weather[0];

    cityOutput.textContent = name;
    dateOutput.textContent = date;
    tempOutput.textContent = `${temp}°F`;
    descOutput.textContent = description;
    uvOutput.textContent = uvi;
    humidityOutput.textContent = `${humidity}%`;
    windOutput.textContent = `${wind_speed} mph`;
    feelsLikeOutput.textContent = `${feels_like}°F`

    // 5-day forecast temperature
    get5Day(daily);

}


function get5Day(data) {
    
    console.log(data)

    for (let i=1; i<6; i++) {
        const timestamp = data[i].dt;
        const dayDate = convertTimestamp(timestamp);
   
        const icon = data[i].weather[0].icon;
        document.querySelector(`.day${i}-date`).textContent = dayDate;
        document.querySelector(`.day${i}-temp`).textContent = `${data[i].temp.day}°F`;
        document.querySelector(`.day${i}-humidity`).textContent = `${data[i].humidity}%`;
        document.querySelector(`.day${i}-wind`).textContent = `${data[i].wind_speed} mph`;
        document.querySelector(`.day${i}-icon`).src = `http://openweathermap.org/img/wn/${icon}.png`;
    }


}   

function saveQuery(city){
    
}


function getCurrentDate() {
    const currentDate = new Date();

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    const date = currentDate.toLocaleString('en-US', options);

    return date;
};

function convertTimestamp(timestamp) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    // convert timestamp: https://stackoverflow.com/questions/24170933/convert-unix-timestamp-to-date-time-javascript
    const date = new Date(timestamp*1000);
    const convertedDate = date.toLocaleString('en-US', options);

    return convertedDate;
}

// https://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=66c87a27c099bc7c4716aa574eadefef

// https://api.openweathermap.org/data/2.5/onecall?lat=51.5073&lon=-0.1276&exclude=hourly,minutely&units=imperial&appid=66c87a27c099bc7c4716aa574eadefef


// https://api.openweathermap.org/data/2.5/onecall?lat=51.5073&lon=-0.1276&exclude=hourly,minutely&units=imperial&appid=66c87a27c099bc7c4716aa574eadefef
