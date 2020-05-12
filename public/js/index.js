// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.locationName)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
  var home = $exampleText.val().trim();
  var destination = $exampleDescription.val().trim();
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
    var homeCity = {
      locationType: "Hometown",
      locationName: response.name,
      longitude: response.coord.lon,
      latitude: response.coord.lat
    };
    console.log(homeCity);
    if (!homeCity.locationName) {
      alert("You must enter a home city");
      return;
    }
    API.saveExample(homeCity).then(function() {
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
        var destinationCity = {
          locationType: "Destination",
          locationName: res.name,
          longitude: res.coord.lon,
          latitude: res.coord.lat
        };
        console.log(destinationCity.latitude);
        console.log(homeCity.latitude);
        var distance = getDistance(
          homeCity.latitude,
          destinationCity.latitude,
          homeCity.longitude,
          destinationCity.longitude
        );
        console.log(distance);

        API.saveExample(destinationCity).then(function() {
          refreshExamples();
        });
        $exampleText.val("");
        $exampleDescription.val("");
      });
    });
  });
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
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
// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
