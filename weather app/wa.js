document.getElementById('search-button').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '60671228edmsh83803c40f4cec1bp1a5922jsna37a905c17b7',
            'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails}`);
        }
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
});

function updateWeather(data) {
    const weatherData = data.current_observation;
    const temperatureF = weatherData.condition.temperature;
    const temperatureC = Math.round(((temperatureF - 32) * 5 / 9).toFixed(1));
    const windSpeedMph = weatherData.wind.speed;
    const windSpeedKmh = (windSpeedMph * 1.60934).toFixed(1);

    document.getElementById('temperature').textContent = `${temperatureC}°C`;
    document.getElementById('city-name').textContent = data.location.city;
    document.getElementById('humidity').textContent = `${weatherData.atmosphere.humidity}%`;
    document.getElementById('wind-speed').textContent = `${windSpeedKmh} km/h`;
}