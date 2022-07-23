import React, { useState, useEffect } from "react";
import WeatherContainer from "./WeatherContainer";
import { getModeValue } from "../utils/helpers";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [currentCoodinates, setCurrentCoodinates] = useState();

  const BASE_URL = `https://api.openweathermap.org/data/2.5/`;
  const API_KEY = `fe6e97dd4bc94a7ca78a46a1b8f1bcb5`;

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    currentCoodinates && getWeatherInfo(currentCoodinates.lat, currentCoodinates.lon);
  }, [currentCoodinates]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentCoodinates({ lat: position.coords.latitude, lon: position.coords.longitude });
    });
  };

  const getDateFromToday = (addedDay = 0) => {
    const date = new Date();
    const day = date.getDate() + addedDay;
    const month = date.getMonth() + 1;
    const currentDate = `${day}/${month}`;
    return currentDate;
  };

  const getWeatherCoordinates = async (query) => {
    try {
      const cityResponse = await fetch(
        `${BASE_URL}weather?q=${query}&units=metric&appid=${API_KEY}`
      );
      const cityData = await cityResponse.json();
      return cityData.coord;
    } catch (error) {
      console.error(error);
    }
  };

  const getWeatherInfo = async (lat, lon) => {
    try {
      const response = await fetch(
        `${BASE_URL}onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const coordinates = await getWeatherCoordinates(city);
      getWeatherInfo(coordinates?.lat, coordinates?.lon);
      setCity("");
    } catch (error) {
      console.error(error);
    }
  };

  if (!weatherData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='app'>
      <h1 className='header'>{weatherData?.timezone}</h1>
      <form onSubmit={handleSubmit}>
        <div className='input'>
          <input
            type='text'
            placeholder='Enter a city ...'
            name='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </form>
      <div className='mainWeather glassMorphism'>
        <div className='mainDate'>{getDateFromToday()}</div>
        <div className='mainTemp'>{Math.round(weatherData?.daily[0].temp.day)}°C</div>
        <div className='minMax-main'>
          <div>Min: {Math.round(weatherData?.daily[0].temp.min)}°C</div>
          <div>Max: {Math.round(weatherData?.daily[0].temp.max)}°C</div>
        </div>
        <div className='extraInfos'>
          <div>Morning: {Math.round(weatherData?.daily[0].temp.morn)}°C</div>
          <div>Day: {Math.round(weatherData?.daily[0].temp.day)}°C</div>
          <div>Night: {Math.round(weatherData?.daily[0].temp.night)}°C</div>
          <div>Humidity: {Math.round(weatherData?.daily[0].humidity)}%</div>
          <div>
            Mean:{" "}
            {Math.round((weatherData?.daily[0].temp.min + weatherData?.daily[0].temp.max) / 2)}°C
          </div>
          <div>Mode: {getModeValue(weatherData?.daily[0].temp)}°C</div>
        </div>
      </div>
      <div className='days'>
        <WeatherContainer weatherData={weatherData?.daily[1]} date={getDateFromToday(1)} />
        <WeatherContainer weatherData={weatherData?.daily[2]} date={getDateFromToday(2)} />
        <WeatherContainer weatherData={weatherData?.daily[3]} date={getDateFromToday(3)} />
        <WeatherContainer weatherData={weatherData?.daily[4]} date={getDateFromToday(4)} />
      </div>
    </div>
  );
};

export default App;
