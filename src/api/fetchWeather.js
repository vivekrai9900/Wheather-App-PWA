import axios from "axios";

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

export const fetchWeather = async (query) => {
    try {
        const { data } = await axios.get(URL, {
            params: {
                q: query,
                units: 'metric',
                appid: API_KEY,
            }
        });

        return data;
    } catch (error) {
        // Handle errors here, e.g., log them or return a default value
        console.error('Error fetching weather data:', error);
        return null;
    }
}
