import React from 'react'
import './Card.css'

const Card = ({weather}) => {
 
  return (
    <div>
        <div className='card '>  
      {weather && (
        <div className="text-[1.2rem] ">
            <div className="cardback">
                <h2 className=' '>Weather in {weather.city} - {weather.country}</h2>
                <p >Temperature: {weather.temp}°C</p>
                <p>Feels Like: {weather.feelsLike}°C</p>
                <p>Humidity: {weather.humidity}%</p>
                <p>Wind: {weather.wind} km/h</p>
                <p>Description: {weather.description}</p>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Card