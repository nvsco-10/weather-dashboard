const input = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const cityOutput = document.querySelector(".city-name");
const dateOutput = document.querySelector(".date");

//current weather data selectors
const tempOutput = document.querySelector(".temp");
const descOutput = document.querySelector(".description")
const uvOutput = document.querySelector(".uv-index");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const feelsLikeOutput = document.querySelector(".feels-like")

const fiveDayOutput = document.querySelector(".five-day");

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
    const date = getCurrentDate();
    const { current, daily } = data;

    // current weather data
    const { temp, uvi, wind_speed, humidity, feels_like, weather } = current;
    const { icon, description } = weather[0];

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
    const currentDate = new Date();
    fiveDayOutput.innerHtml = "";

    for (let i=0; i<5; i++) {
        const { temp, humidity, wind_speed, weather } = data[i];
        const { icon } = weather[0];
   
        fiveDayOutput.append(
            `<div class="day-box">
                <span>January 3</span>
                <div class="future-data">
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon">
                    <div>
                        <span>${temp.day}°F</span>
                        <p><span>${humidity}%</span> | <span>${wind_speed} mph</span></p>
                    </div>
                </div>
            </div>`
        )
    }
        
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
}

// https://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=66c87a27c099bc7c4716aa574eadefef

// https://api.openweathermap.org/data/2.5/onecall?lat=51.5073&lon=-0.1276&exclude=hourly,minutely&units=imperial&appid=66c87a27c099bc7c4716aa574eadefef


// https://api.openweathermap.org/data/2.5/onecall?lat=51.5073&lon=-0.1276&exclude=hourly,minutely&units=imperial&appid=66c87a27c099bc7c4716aa574eadefef

//time stamp to date: https://www.delftstack.com/howto/javascript/javascript-convert-timestamp-to-date/