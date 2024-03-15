import React, { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [placeNotFound, setPlaceNotFound] = useState(false);

    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchWeather(query);
            if (data === null) {
                // Display alert message if data is null
                alert('Place not found!');
                // Clear weather data
                setWeather({});
            } else if (data.cod === '404') {
                // If place not found, set placeNotFound state to true
                setPlaceNotFound(true);
                // Clear weather data
                setWeather({});
                // Display alert message
                alert('Place not found!');
            } else {
                // If place found, set placeNotFound state to false
                setPlaceNotFound(false);
                // Set weather data
                setWeather(data);
            }
            setQuery('');
        }
    };
    
    

    return (
        <div className='main-container'>
            <input
                type='text'
                className='search'
                placeholder='Search...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />

            {placeNotFound && (
                <div className='city'>
                    <h2 className='city-name'>Place not found</h2>
                </div>
            )}

            {weather.main && !placeNotFound && (
                <div className='city'>
                    <h2 className='city-name'>
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>

                    <div className='city-temp'>
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>

                    <div className='info'>
                        <img
                            className='city-icon'
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                            alt={weather.weather[0].description}
                            key={weather.weather[0].icon}
                        />

                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
