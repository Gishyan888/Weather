import React, { useEffect, useState } from "react";
import styles from "./weather-time.module.css"

function WeatherTime() {

    let [value, setValue] = useState("")
    let [temperature, setTemperature] = useState("Temperature")
    let [country, setCountry] = useState("")
    let [wind, setWind] = useState("")

    useEffect(() => {
        const handle = setTimeout(() => {
            fetch("https://api.openweathermap.org/data/2.5/weather?q=" + value + "&units=metric&appid=daca374096c5ce77f15a453accbf995c")
                .then(response => response.json())
                .then(data => setTemperature(data.main.temp) & setCountry(data.sys.country) & setWind(data.wind.speed))
        }, 200)

        return () => {
            clearTimeout(handle)
        }

    }, [value])
    function handleChange(event) {
        let result = event.target.value.replace(/[^a-z]/gi, '')
        setValue(result.charAt(0).toUpperCase() + result.slice(1))
        if (event.target.value.length < 2) {
            setTemperature(undefined)
            setCountry(undefined)
            setWind(undefined)
        }
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.weather_box}>
                    <input type="text" className={styles.inp_city} placeholder="Enter location" value={value} onChange={handleChange}></input>
                    <div className={styles.requested}>
                        <h3>Weather in {value}</h3>
                        <h2>{temperature}°C</h2>
                        <h4>Country : {country}</h4>
                        <h4>Wind Speed : {wind} km/h</h4>
                        
                    </div>
                </div>
            </div>

        </>
    )
}

export default WeatherTime