
$(document).ready(function () {
  $(".weather-form").submit(function (event) {
      event.preventDefault();
      var city = $("#city").val();

      if (city != "") {
          $.ajax({
              url: "https://api.weatherapi.com/v1/forecast.json?key=f80af2edb12a45bc85d113841231302&q=" + city + "&days=7&aqi=no&alerts=no",
              type: "GET",
              dataType: "json",
              success: function (data) {
                  $("#city-name").html(data.location.name + ", " + data.location.country);
                  $("#temp").html(data.current.temp_c + "&#8451;");
                  $("#condition").html(data.current.condition.text);
                  $("#icon").attr("src", "https:" + data.current.condition.icon);

                  // 7-day forecast
                  for (let i = 0; i < 7; i++) {
                      let forecast = data.forecast.forecastday[i];
                      let date = forecast.date;
                      let temp = forecast.day.avgtemp_c + "&#8451;";
                      let condition = forecast.day.condition.text;
                      let icon = "https:" + forecast.day.condition.icon;

                      $("#date-" + (i + 1)).html(date);
                      $("#temp-" + (i + 1)).html(temp);
                      $("#condition-" + (i + 1)).html(condition);
                      $("#icon-" + (i + 1)).attr("src", icon);
                  }
              }
          });
      } else {
          alert("City field cannot be empty");
      }
  });
});
