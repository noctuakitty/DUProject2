var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Destination.findAll({
      include: [db.User]
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
      include: [db.Destination]
    }).then(function(user) {

      res.render("traveler", {
        destination: user.Destinations,
        user: user
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
