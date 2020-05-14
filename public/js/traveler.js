var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "../api/trips",
      data: JSON.stringify(example)
    });
  }
};
var handleFormSubmit = function(event) {
  event.preventDefault();
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
  var home = $("#departure").val().trim();
  var destination = $("#arrival").val().trim();
  var user = $("#submit").val();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" +
    home +
    "&units=imperial&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    home = response.name;
    var departureLon = response.coord.lon;
    var departureLat = response.coord.lat;

    if (!home) {
      alert("You must enter a home city");
      return;
    }

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" +
      destination +
      "&units=imperial&appid=" +
      APIKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(res) {
      destination = res.name;
      var arrivalLon = res.coord.lon;
      var arrivalLat = res.coord.lat;

      var distance = getDistance(
        departureLat,
        arrivalLat,
        departureLon,
        arrivalLon
      );
      console.log(user);
      var trip = {
        departureCity: home,
        arrivalCity: destination,
        tripDistance: distance,
        UserId: user
      };

      API.saveExample(trip).then(function() {
        location.reload();
      });
    });
  });
};
var getDistance = function(lat1, lat2, lon1, lon2) {
  var R = 3958.8; // metres
  var φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  var φ2 = (lat2 * Math.PI) / 180;
  var Δφ = ((lat2 - lat1) * Math.PI) / 180;
  var Δλ = ((lon2 - lon1) * Math.PI) / 180;

  var a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;
  return d;
};
$("#submit").on("click", handleFormSubmit);
