// Wysyłanie zapytania do API

async function getWeatherData(city) {
    const API_KEY = 'f80af2edb12a45bc85d113841231302';
    const API_URL = `http://api.weatherapi.com/v1/current.json`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Parsowanie odpowiedzi z API i wyświetlenie danych pogodowych

async function displayWeatherData(city) {
    const weatherData = await getWeatherData(city);
    console.log(weatherData);

    const weatherContainer = document.querySelector(".weather-info");
    weatherContainer.innerHTML = `
    <p>Temperature: ${weatherData.cuurent.temp_c}°C</p>
    <p>Humidity: ${weatherData.current.humidity}%</p>
    <p>Wind: ${weatherData.curent.wind_kph} km/h</p>
    `;
}

const weatherForm = document.querySelector(".weather-form");
weatherForm.addEventListener("submit", event => {
    event.preventDefault();
    const cityInput = weatherForm.querySelector(`input[name="city"]`);
    const city = cityInput.value;
    displayWeatherData(city);
});