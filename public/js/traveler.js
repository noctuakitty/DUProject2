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
      for (var i = 0; i < response.length; i++) {
        if (response[i].Activities.length > 0) {
          for (var j = 0; j < response[i].Activities.length; j++) {
            var match = false;
            for (var k = 0; k < activityArray.length; k++) {
              if (response[i].Activities[j].activityName === activityArray[k]) {
                match = true;
              }
            }
            if (match === false) {
              addActivity(
                response[i].Activities[j].activityName,
                response[i].Activities[j].activityDescription
              );
            }
          }
        }
      }
    });
  },
  saveActivities: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/activities",
      data: JSON.stringify(example)
    });
  }
};
var activityArray = [];
var startTrip = function(event) {
  event.preventDefault();
  var home = $("#departure")
    .val()
    .trim();
  var destination = $("#arrival")
    .val()
    .trim();
  var user = $("#submit").val();
  $("#start-trip-form").empty();
  $("#depart-text")
    .text("Departure City: " + home)
    .attr("data-name", home);
  $("#arrive-text")
    .text("Arrival City:  " + destination)
    .attr("data-name", destination);
  // $("#trip-type-text")
  //   .text("Trip Type: " + tripType)
  //   .attr("data-name", tripType);
  queryLocations(home, destination, user);
};

var saveTripActivities = function(activity, description, tripData, i) {
  activity = {
    activityName: activity,
    activityDescription: description,
    DestinationId: tripData.id,
    UserId: tripData.UserId
  };
  API.saveActivities(activity).then(function() {
    return;
  });
};

var addActivity = function(activity, description) {
  activityArray.push(activity);
  console.log(activityArray);
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
          .attr("data-description", description)
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
        printActivityDiv(data);
      });
    });
  });
};
var printActivityDiv = function(data) {
  var tripData = data;
  var userMiles = parseInt($("#miles").attr("value"));
  console.log(userMiles);
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
  var blogText = $("<div>")
    .attr("type", "text")
    .attr("id", "trip-blog")
    .addClass("form-control")
    .attr("rows", "3");
  var button2 = $("<button>")
    .attr("type", "button")
    .attr("id", "submit-trip")
    .addClass("btn btn-danger")
    .text("Finish Trip");
  $("#finish-trip").append(blogText);
  $("#finish-trip").append(button2);

  $("#add-activity").on("click", function() {
    var activity = $("#activity-input")
      .val()
      .trim();
    var description = $("#activity-description")
      .val()
      .trim();
    $("#activity-input").val("");
    $("#activity-description").val("");
    addActivity(activity, description);
  });
  $("#submit-trip").on("click", function() {
    for (var i = 0; i < activityArray.length; i++) {
      var buttonId = activityArray[i].replace(/\s+/g, "-").toLowerCase();
      if ($("#" + buttonId).prop("checked") === true) {
        var activity = $("#" + buttonId).val();
        var description = $("#" + buttonId).attr("data-description");
        saveTripActivities(activity, description, tripData);
      }
    }
    userMiles += parseInt(tripData.tripDistance);
    var newMiles = {
      id: tripData.UserId,
      milesTraveled: userMiles
    };
    userMiles += tripData.tripDistance;
    $.ajax("/api/users/" + tripData.UserId, {
      type: "PUT",
      data: newMiles
    }).then(function() {
      location.reload();
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
