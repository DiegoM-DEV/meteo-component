import { useState } from "react";

import { fetchPlaces } from "./services/fetchPlaces";
import { fetchWeather } from "./services/fetchWeather";

export default function Component() {
  const [places, setPlaces] = useState({
    places: [],
    loading: false,
    error: false,
  });
  const [placeWeather, setPlaceWeather] = useState({
    weather: {},
    loading: false,
  });

  function handlePlaceClick(index) {
    const place = places.places[index];
    const { latitude } = place;
    const { longitude } = place;
    fetchWeather(latitude, longitude, setPlaceWeather);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const cap = formData.get("cap");
    placeWeather.loading = false;
    fetchPlaces(cap, setPlaces);
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>Enter the CAP code</label>
        <div className="row">
          <input
            type="text"
            name="cap"
            placeholder="CAP"
            pattern="[0-9]+"
            required
          />
          <button type="submit">Send</button>
        </div>
      </form>
      <div className="places-section">
        <p>Places Finded</p>
        <div className="places">
          {places.loading && !places.error ? (
            <>
              {places.places.map((place, index) => (
                <div
                  className="place-container"
                  key={index}
                  onClick={() => {
                    handlePlaceClick(index);
                  }}
                >
                  <p className="place">{place["place name"]}</p>
                </div>
              ))}
            </>
          ) : (
            <>
              {places.loading && places.error ? (
                <p>CAP code is wrong</p>
              ) : (
                <p>No CAP code has been entered</p>
              )}
            </>
          )}
        </div>
        {placeWeather.loading && (
          <div className="weather">
            <>
              <p>Temperature</p>
              <p>{placeWeather.weather.temp} °C</p>
              <p>Humidity</p>
              <p>{placeWeather.weather.humidity} %</p>
              <p>Weather</p>
              <p>{placeWeather.weather.weather}</p>
            </>
          </div>
        )}
      </div>
    </main>
  );
}
