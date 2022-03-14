const key = "66c87a27c099bc7c4716aa574eadefef";

function convertToCoordinates(cityname) {
    // convert city name to coordinates - needed to use one call api
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=5&appid=${key}`

    fetch(geocodingUrl)
    .then(result => result.json())
    .then(data => {
        // console.log(data[0])
        const { lat, lon } = data[0];
        
        getWeather(lat,lon)
    })

}

function getWeather(lat,lon) {
    // one call api - exclude hourly & minutely 
    const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${key}`
    
    fetch(oneCallUrl)
        .then(result => result.json())
        .then(data => console.log(data))
}


convertToCoordinates("london");


