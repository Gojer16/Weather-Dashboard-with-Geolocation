import React from 'react'
import { useState, useEffect } from "react";

const useGeolocation = (enabled = true) => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    if (!enabled) return

    setLoading(true)
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
            const fuzz = (value) => parseFloat((value + (Math.random() * 0.002 - 0.001)).toFixed(3));
            const lat = parseFloat(position.coords.latitude.toFixed(3));
            const lng = parseFloat(position.coords.longitude.toFixed(3));

                setLocation({lat , lng }) // save in location state
                setLoading(false)
            }, 
            (error) => {
                setError(`location acess Failed: ${error.message}`)
                setLoading(false)
                console.log(`Error message: ${error}`);
            })
        } 
        else {
            setLoading(false)
            setError(`Your browser not support geolocation, please use another browser!`)
            console.log(`Your browser not support geolocation, please use another browser!`);
        } 
    }, [enabled])
    

  return { location , error, loading }
}

export default useGeolocation