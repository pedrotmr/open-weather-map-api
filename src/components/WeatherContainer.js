import React from "react";
import { getModeValue } from "../utils/helpers";

const WeatherContainer = ({ weatherData, date }) => {
  return (
    <div className='weatherContainer glassMorphism'>
      <div className='date'>{date}</div>
      <div className='temp'>{Math.round(weatherData?.temp.day)} °C</div>
      <div className='minMax'>
        <div>{Math.round(weatherData?.temp.min)} °C</div>
        <div>-</div>
        <div>{Math.round(weatherData?.temp.max)} °C</div>
      </div>
      <div className='extraInfos'>
        <div>Morning: {Math.round(weatherData?.temp.morn)}°C</div>
        <div>Day: {Math.round(weatherData?.temp.day)}°C</div>
        <div>Night: {Math.round(weatherData?.temp.night)}°C</div>
        <div>Humidity: {Math.round(weatherData?.humidity)}%</div>
        <div>Mean: {Math.round((weatherData?.temp.min + weatherData?.temp.max) / 2)}°C</div>
        <div>Mode: {getModeValue(weatherData?.temp)}°C</div>
      </div>
    </div>
  );
};

export default WeatherContainer;
