var API = {
  saveTrip: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "../api/trips",
      data: JSON.stringify(example)
    });
  },
  getActivities: function(type) {
    $.get("/api/trips/" + type, function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        addActivity(response[i].activityName, response[i].activityDescription);
      }
    });
  }
};
var startTrip = function(event) {
  event.preventDefault();

  var home = $("#departure")
    .val()
    .trim();
  var destination = $("#arrival")
    .val()
    .trim();
  var user = $("#submit").val();
  var tripType = $("#trip-type")
    .val()
    .trim();
  $("#start-trip-form").empty();
  $("#depart-text")
    .text("Departure City: " + home)
    .attr("data-name", home);
  $("#arrive-text")
    .text("Arrival City:  " + destination)
    .attr("data-name", destination);
  $("#trip-type-text")
    .text("Trip Type: " + tripType)
    .attr("data-name", tripType);
  var tripId = queryLocations(home, destination, user);
  var activityLabel = $("<label>").text("Activity");
  var activityInput = $("<input>") 
    .attr("type", "text")
    .attr("id", "activity-input")
    .addClass("form-control");
  var activityDescLabel = $("<label>").text("Description");
  var activityDesc = $("<input>")
    .attr("type", "text")
    .attr("id", "activity-description")
    .addClass("form-control");
  var button = $("<button>")
    .attr("type", "button")
    .attr("id", "add-activity")
    .addClass("btn btn-danger")
    .text("Add Activity");
  $("#activity-input-div").append(activityLabel);
  $("#activity-input-div").append(activityInput);
  $("#activity-des-div").append(activityDescLabel);
  $("#activity-des-div").append(activityDesc);
  $("#activity-button-div").append(button);

  $("#add-activity").on("click", function() {
    var activity = $("#activity-input")
      .val()
      .trim();
    var description = $("#activity-description")
      .val()
      .trim();
    addActivity(activity, description);
  });
};
var addActivity = function(activity, description) {
  var activityId = activity.replace(/\s+/g, "-").toLowerCase();
  $("#activities").append(
    $("<div>")
      .addClass("form-check")
      .append(
        $("<input>")
          .attr("type", "checkbox")
          .addClass("form-check-input")
          .val(activity)
          .attr("id", activityId)
      )
      .append(
        $("<label>")
          .addClass("form-check-label")
          .text(activity + "     Description: " + description)
      )
  );
};

var queryLocations = function(home, destination, user) {
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
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
      API.getActivities(destination);
      var arrivalLon = res.coord.lon;
      var arrivalLat = res.coord.lat;

      var distance = getDistance(
        departureLat,
        arrivalLat,
        departureLon,
        arrivalLon
      );
      $("#distance-text").text("Travel Distance:  " + parseInt(distance));
      var trip = {
        departureCity: home,
        arrivalCity: destination,
        tripDistance: distance,
        UserId: user
      };

      API.saveTrip(trip).then(function(data) {
        return data.id;
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
$("#submit").on("click", startTrip);
