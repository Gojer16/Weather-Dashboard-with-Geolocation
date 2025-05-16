import React from 'react'

const parseWeatherData = (rawData) => {
    if (!rawData) return null

    return {
    city: rawData.name,
    country: rawData.sys?.country,
    temp: Math.round(rawData.main?.temp),
    feelsLike: Math.round(rawData.main?.feels_like),
    humidity: rawData.main?.humidity,
    wind: rawData.wind?.speed,
    icon: rawData.weather?.[0]?.icon,
    description: rawData.weather?.[0]?.description,
    }
}

export default parseWeatherData