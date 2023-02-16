$(document).ready(function() {
    $('#get-weather').click(function (event) {
        event.preventDefault();
        const city = $('#city').val();
        const key = 'f80af2edb12a45bc85d113841231302';
        const url = 'https://api.weatherapi.com/v1/current.json?key=' + key + '&q=' + city;
  
      $.ajax({
        url: url,
        success: function(data) {
            $('#city-name').text(data.location.name + ', ' + data.location.country);

            $('#temp').text(data.current.temp_c + ' °C');
            
            $('#condition').text(data.current.condition.text);

            $('#icon').attr('src', 'https:' + data.current.condition.icon);
          }, 
          error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus, errorThrown);
        }
      });
    });
  });