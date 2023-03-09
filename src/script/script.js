document.addEventListener("DOMContentLoaded", function () {
  const weatherForm = document.querySelector(".weather-form");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temp");
  const condition = document.getElementById("condition");
  const icon = document.getElementById("icon");
  const weatherTable = document.getElementById("weather-table");
  const cityInput = document.getElementById("city");
  const list = [];

  function displayCities(data) {
    list.length = 0;
    data.forEach((city) => {
      list.push(city.name);
    });
    cityInput.setAttribute("data-list", list);
  }

  function displayWeatherData(data) {
    cityName.innerHTML = `${data.location.name}, ${data.location.country}`;
    temperature.innerHTML = `${data.current.temp_c} &#8451;`;
    condition.innerHTML = data.current.condition.text;
    icon.setAttribute("src", `https:${data.current.condition.icon}`);
    weatherTable.style.display = "block";

    // 7-day forecast
    for (let i = 0; i < 7; i++) {
      const forecast = data.forecast.forecastday[i];
      if (forecast) {
        const date = forecast.date;
        const temp = `${forecast.day.avgtemp_c} &#8451;`;
        const condition = forecast.day.condition.text;
        const icon = `https:${forecast.day.condition.icon}`;

        document.getElementById(`date-${i}`).innerHTML = date;
        document.getElementById(`temp-${i}`).innerHTML = temp;
        document.getElementById(`condition-${i}`).innerHTML = condition;
        document.getElementById(`icon-${i}`).setAttribute("src", icon);
      }
    }
  }

  function displayError(error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }

  function getCities(inputText) {
    const url = `https://api.weatherapi.com/v1/search.json?key=f80af2edb12a45bc85d113841231302&q=${encodeURIComponent(
      inputText
    )}`;
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  }

  function getWeatherData(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=f80af2edb12a45bc85d113841231302&q=${encodeURIComponent(
      city
    )}&days=7&aqi=no&alerts=no`;
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const city = document.getElementById("city").value;
    if (city !== "") {
      getWeatherData(city).then(displayWeatherData).catch(displayError);
    } else {
      alert("City field cannot be empty");
    }
  }

  function handleInput() {
    const inputText = this.value;
    getCities(inputText).then(displayCities).catch(displayError);
  }

  function displayCities(data) {
    const datalist = document.getElementById("cities-list");
    datalist.innerHTML = "";
    data.forEach((city) => {
      const option = document.createElement("option");
      option.value = city.name;
      datalist.appendChild(option);
    });
  }

  cityInput.addEventListener("input", handleInput);

  weatherForm.addEventListener("submit", handleSubmit);
});
