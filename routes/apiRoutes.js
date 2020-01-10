// Dependencies
// =============================================================
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // Get all entries
  app.get("/api/all", function(req, res) {
    db.Waffle.findAll().then(function(dbWaffles) {
      res.json(dbWaffles);
    });
  });

  // Get one entry by id
  app.get("/api/id/:id", function(req, res) {
    db.Waffle.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbWaffles) {
      res.json(dbWaffles);
    });
  });

  // Get child entries of id
  app.get("/api/children/:id", function(req, res) {
    db.Waffle.findAll({
      where: {
        parentId: req.params.id
      }
    }).then(function(dbWaffles) {
      res.json(dbWaffles);
    });
  });

  // Add an entry
  app.post("/api/add", function(req, res) {
    db.Waffle.create(req.body).then(function(dbWaffle) {
      res.json(dbWaffle);
    });
  });

  // Hide an entry by id
  app.put("/api/hide/:id", function(req, res) {
    db.Waffle.update(
      {
        hidden: true
      },
      {
        where: { id: req.params.id }
      }
    ).then(function(dbWaffles) {
      res.json(dbWaffles);
    });
  });

  // Show an entry by id
  app.put("/api/show/:id", function(req, res) {
    db.Waffle.update(
      {
        hidden: true
      },
      {
        where: { id: req.params.id }
      }
    ).then(function(dbWaffles) {
      res.json(dbWaffles);
    });
  });
};
