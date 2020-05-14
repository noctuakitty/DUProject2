var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/trips", function(req, res) {
    db.Destination.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/trips", function(req, res) {
    console.log(req.body);
    db.Destination.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  app.post("/api/users", function(req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Destination.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
