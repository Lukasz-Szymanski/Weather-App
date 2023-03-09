document.addEventListener("DOMContentLoaded", function () {
  const weatherForm = document.querySelector(".weather-form");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temp");
  const condition = document.getElementById("condition");
  const icon = document.getElementById("icon");
  const weatherTable = document.getElementById("weather-table");

  weatherForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("city").value;

    if (city !== "") {
      fetch(
        "https://api.weatherapi.com/v1/forecast.json?key=f80af2edb12a45bc85d113841231302&q=" +
          city +
          "&days=7&aqi=no&alerts=no"
      )
        .then((response) => response.json())
        .then((data) => {
          cityName.innerHTML =
            data.location.name + ", " + data.location.country;
          temperature.innerHTML = data.current.temp_c + "&#8451;";
          condition.innerHTML = data.current.condition.text;
          icon.setAttribute("src", "https:" + data.current.condition.icon);

          weatherTable.style.display = "block";
          // 7-day forecast
          for (let i = 0; i < 7; i++) {
            const forecast = data.forecast.forecastday[i];
            if (forecast) {
              const date = forecast.date;
              const temp = forecast.day.avgtemp_c + "&#8451;";
              const condition = forecast.day.condition.text;
              const icon = "https:" + forecast.day.condition.icon;

              document.getElementById("date-" + (i + 1)).innerHTML = date;
              document.getElementById("temp-" + (i + 1)).innerHTML = temp;
              document.getElementById("condition-" + (i + 1)).innerHTML =
                condition;
              document
                .getElementById("icon-" + (i + 1))
                .setAttribute("src", icon);
            }
          }
        })
        .catch((error) => console.error(error));
    } else {
      alert("City field cannot be empty");
    }
  });
});
