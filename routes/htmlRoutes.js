var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Destination.findAll({
      include: [db.User, db.Activity],
      order: [["createdAt", "DESC"]]
    }).then(function(destinations) {
      var destinations = destinations;
      db.User.findAll({}).then(function(users) {
        res.render("index", {
          destination: destinations,
          user: users
        });
      });
    }); 
  });

  // Load example page and pass in an example by id
  app.get("/trip/:id", function(req, res) {
    db.Destination.findOne({ where: { id: req.params.id } }).then(function(
      destinations
    ) {
      console.log(destinations);
      res.render("trip", {
        destination: destinations
      });
    });
  });
  app.get("/traveler/:id", function(req, res) {
    db.User.findOne({
      where: { id: req.params.id },
      include: [db.Destination, db.Activity]
    }).then(function(user) {
      var destinations = user.Destinations;

      for (var i = 0; i < user.Destinations.length; i++) {
        var activities = [];
        for (var j = 0; j < user.Activities.length; j++) {
          if (user.Destinations[i].id === user.Activities[j].DestinationId) {
            activities.push({
              id: user.Activities[j].id,
              activityName: user.Activities[j].activityName,
              activityDescripiton: user.Activities[j].activityDescription
            });
          }
        }
        destinations[i] = {
          id: user.Destinations[i].id,
          departureCity: user.Destinations[i].departureCity,
          arrivalCity: user.Destinations[i].arrivalCity,
          tripDistance: user.Destinations[i].tripDistance,
          activities: activities
        };
      }
  
      res.render("traveler", {
        destination: destinations,
        user: user
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
