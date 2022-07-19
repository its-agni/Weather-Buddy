import React, { useState } from "react";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forecast from "./components/Forecast/Forecast";
import { CURRENT_WEATHER, API_KEY } from "./api";

import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const searchChangeHandler = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${CURRENT_WEATHER}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${CURRENT_WEATHER}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      {!currentWeather && (
        <h1 className="hero-heading">What's The Weather Up there!</h1>
      )}
      <Search onSearchChange={searchChangeHandler} />
      {!currentWeather && (
        <div className="hero-img">
          <img alt="weather" src="hero-img.png" />
        </div>
      )}

      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
