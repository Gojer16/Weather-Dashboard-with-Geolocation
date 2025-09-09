const parseWeatherData = (rawData, units = 'metric') => {
    if (!rawData) return null

    return {
    city: rawData.name,
    country: rawData.sys?.country,
    temp: Math.round(rawData.main?.temp),
    feelsLike: Math.round(rawData.main?.feels_like),
    humidity: rawData.main?.humidity,
    pressure: rawData.main?.pressure,
    visibility: rawData.visibility,
    // OpenWeather: wind speed is m/s for metric, miles/hour for imperial if units=imperial
    wind: units === 'imperial' ? rawData.wind?.speed : rawData.wind?.speed * 3.6,
    icon: rawData.weather?.[0]?.icon,
    description: rawData.weather?.[0]?.description,
    }
}

export default parseWeatherData