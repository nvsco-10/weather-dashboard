const input = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const cityOutput = document.querySelector(".city-name");
const dateOutput = document.querySelector(".date");
const tempOutput = document.querySelector(".temp");
const uvOutput = document.querySelector(".uv-index");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const feelsLikeOutput = document.querySelector(".feels-like")

const key = "66c87a27c099bc7c4716aa574eadefef";

submitBtn.addEventListener("click", function() {
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
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${key}`
    
    fetch(oneCallUrl)
        .then(result => result.json())
        .then(data => displayWeatherData(data))
}

function displayWeatherData(data) {
    const { current, daily } = data;
    console.log(current);
    console.log(daily);

    //time stamp to date: https://www.delftstack.com/howto/javascript/javascript-convert-timestamp-to-date/
    
    // current weather data = data.current
    // const { temp } = data.current;
    // console.log("temp: " + temp)


    // five data weather data = data.daily[0]
    // console.log(data.daily[0])
}



