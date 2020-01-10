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
    if (
      !req.body.parentId ||
      !req.body.title ||
      !req.body.body ||
      !req.body.question
    ) {
      return res.send("Missing info");
    } else if (req.body.title.length < 4 || req.body.title.length > 40) {
      return res.send("Title required between 4 and 40 characters");
    } else if (req.body.body.length < 10) {
      return res.send("Body requires at least 10 characters.");
    } else if (req.body.question.length < 4 || req.body.question.length > 40) {
      return res.send("Question required between 4 and 40 characters");
    } else {
      if (!req.body.hidden) {
        req.body.hidden = false;
      }
      if (!req.body.leaf) {
        req.body.leaf = true;
      }
      db.Waffle.create(req.body)
        .then(function(dbWaffle) {
          res.json(dbWaffle);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
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
