const key = "66c87a27c099bc7c4716aa574eadefef";

const geocodingUrl = `api.openweathermap.org/data/2.5/weather?q={city name}&appid=${key}`
// one call api - exclude hourly & minutely 
const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=hourly,minutely&appid=${key}`