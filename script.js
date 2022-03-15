const input = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const cityOutput = document.querySelector(".city-name");
const dateOutput = document.querySelector(".date");
const tempOutput = document.querySelector(".temp");
const descOutput = document.querySelector(".description")
const uvOutput = document.querySelector(".uv-index");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const feelsLikeOutput = document.querySelector(".feels-like")

const key = "66c87a27c099bc7c4716aa574eadefef";

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
        const { lat, lon } = data[0];
        
        getWeatherData(lat,lon)
    })

}

function getWeatherData(lat,lon) {
    // one call api - exclude hourly & minutely 
    // https://api.openweathermap.org/data/2.5/onecall?lat=51.5073&lon=-0.1276&exclude=hourly,minutely&appid=66c87a27c099bc7c4716aa574eadefef
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=${key}`
    
    fetch(oneCallUrl)
        .then(result => result.json())
        .then(data => displayWeatherData(data))
}

function displayWeatherData(data) {
    const currentDate = getCurrentDate();
    const { current, daily } = data;
    console.log(current);
    console.log(daily);

    

    // current weather data
    const { temp, uvi, wind_speed, humidity, feels_like, weather } = current;
    const { icon, description } = weather[0];

    dateOutput.textContent = currentDate;
    tempOutput.textContent = `${temp}°F`;
    descOutput.textContent = description;
    uvOutput.textContent = uvi;
    humidityOutput.textContent = `${humidity}%`;
    windOutput.textContent = `${wind_speed} mph`;
    feelsLikeOutput.textContent = `${feels_like}°F`

}


    // https://api.openweathermap.org/data/2.5/onecall?lat=51.5073&lon=-0.1276&exclude=hourly,minutely&units=imperial&appid=66c87a27c099bc7c4716aa574eadefef

    //time stamp to date: https://www.delftstack.com/howto/javascript/javascript-convert-timestamp-to-date/
    
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
}

