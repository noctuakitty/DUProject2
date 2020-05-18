var db = require("../models");

module.exports = function(app) {
  app.get("/api/trips", function(req, res) {
    db.Destination.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  app.get("/api/trips/:id", function(req, res) {
    db.Destination.findAll({
      where: { arrivalCity: req.params.id },
      include: [db.Activity]
    }).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });
  app.post("/api/activities", function(req, res) {
    console.log(req.body);
    db.Activity.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  app.post("/api/trips", function(req, res) {
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
  app.put("/api/users/:id", function(req, res) {
    console.log(req.body)
    db.User.update(
      { milesTraveled: req.body.milesTraveled },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(results) {
      res.json(results);
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
