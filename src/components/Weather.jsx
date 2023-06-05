import React, { useState } from "react";
import axios from "axios";
import { Triangle } from "react-loader-spinner";

import logo from "../assets/Logo.png";
import Error from "../assets/Error.gif";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({
    isLoading: false,
    data: {},
    error: false,
  });

  const toDate = () => {
    const months = ['January','February','March','April','May','June','July','August','September','October','Nocvember','December'];
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let currDate = new Date();
    let date = `${days[currDate.getDay()]} ${currDate.getDate()} ${months[currDate.getMonth()]}`
    return date;
  }

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setWeather({
        isLoading: true,
        data: {},
        error: false,
      });

      const API_KEY = "6d8ba079164cf034bb174a50db64054d";
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

      await axios
        .get(URL)
        .then((res) => {
          setWeather({
            isLoading: false,
            data: res.data,
            error: false,
          });
        })
        .catch((error) => {
          setWeather({
            isLoading: false,
            data: {},
            error: true,
          });
        });
      setCity("");
    }
  };

  return (
    <div className="weather-container">
      <div className="title">
        <h1>Weather Cast &nbsp; </h1>
        <img src={logo} alt="" />
      </div>
      <div className="search">
        <input
          type="text"
          className="search-bar"
          name="search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search city..."
          autoComplete="off"
        />
      </div>

      {weather.isLoading && (
        <div className="Loader">
          <Triangle
            height="40"
            width="40"
            radius="4"
            color="#000"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
            />
        </div>
      )}

      {!weather.isLoading && weather.error && (
        <div className="error">
          <img src={Error} alt="" />
          <div>
            <em>Sorry, City not found!</em>
          </div>
        </div>
      )}

{!weather.isLoading && weather && weather.data && weather.data.main && (
        <div className="details">
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDate()}</span>
          </div>
          <div className="icon-temp">
            <div>
            </div>
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
              />
            <span>{Math.round(weather.data.main.temp)}
            <sup className="deg">&deg;C</sup></span>
              
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <span>{'Feels Like'.toUpperCase()}: {weather.data.main.feels_like}<sup>&deg;</sup>C</span> <br />
            <span>HUMIDITY: {weather.data.main.humidity}%</span> <br />
            <span>{'pressure'.toUpperCase()}: {weather.data.main.pressure} mbar</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
