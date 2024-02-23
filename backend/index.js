const express = require("express");
const app = express();
const port = 3001;

const pg_database = require("./api");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

// Season Functions

// Select all seasons.
app.get("/api/seasons", (req, res) => {
  pg_database
    .selectSeasons()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Select a season by it's id.
app.get("/api/season/:season", (req, res) => {
  pg_database
    .selectSeason(req.params.season)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Create a season.
app.post("/api/season", (req, res) => {
  pg_database
    .createSeason(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Delete a season.
app.delete("/api/season", (req, res) => {
  pg_database
    .deleteSeason(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Show Functions

// Select all shows by season id.
app.get("/api/shows/:season", (req, res) => {
  pg_database
    .selectShows(req.params.season)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Select a show by it's id.
app.get("/api/show/:show", (req, res) => {
  pg_database
    .selectShow(req.params.show)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Create a show.
app.post("/api/show", (req, res) => {
  pg_database
    .createShow(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Update a show based on it's id.
app.put("/api/show/:show", (req, res) => {
  pg_database
    .updateShow(req.params.show, req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Delete a show.
app.delete("/api/show/:show", (req, res) => {
  pg_database
    .deleteShow(req.params.show)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Division Functions

// Select all divisions by season id.
app.get("/api/divisions/:season", (req, res) => {
  pg_database
    .selectDivisions(req.params.season)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Select a division by it's id.
app.get("/api/division/:division", (req, res) => {
  pg_database
    .selectDivision(req.params.division)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Create a division.
app.post("/api/division", (req, res) => {
  pg_database
    .createDivision(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Update a division based on it's id.
app.put("/api/division/:division", (req, res) => {
  pg_database
    .updateDivision(req.params.division, req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Delete a division.
app.delete("/api/division/:division", (req, res) => {
  pg_database
    .deleteDivision(req.params.division)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Exhibitor Functions

// Select all exhibitors by season id.
app.get("/api/exhibitors/:season", (req, res) => {
  pg_database
    .selectExhibitors(req.params.season)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Select a exhibitor by it's id.
app.get("/api/exhibitor/:exhibitor", (req, res) => {
  pg_database
    .selectExhibitor(req.params.exhibitor)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Create a exhibitor.
app.post("/api/exhibitor", (req, res) => {
  pg_database
    .createExhibitor(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Update a exhibitor based on it's id.
app.put("/api/exhibitor/:exhibitor", (req, res) => {
  pg_database
    .updateExhibitor(req.params.exhibitor, req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Delete a exhibitor.
app.delete("/api/exhibitor/:exhibitor", (req, res) => {
  pg_database
    .deleteExhibitor(req.params.exhibitor)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Class Functions

// Select all classes by season id.
app.get("/api/classes/:season", (req, res) => {
  pg_database
    .selectClasses(req.params.season)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Select a class by it's id.
app.get("/api/class/:class", (req, res) => {
  pg_database
    .selectClass(req.params.class)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Create a class.
app.post("/api/class", (req, res) => {
  pg_database
    .createClass(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Update a class based on it's id.
app.put("/api/class/:class", (req, res) => {
  pg_database
    .updateClass(req.params.class, req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Delete a class.
app.delete("/api/class/:class", (req, res) => {
  pg_database
    .deleteClass(req.params.class)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Entry Functions

// Select all entries by show and class id.
app.get("/api/entries/:show/:class", (req, res) => {
  console.log(req.params.show + " " + req.params.class);
  pg_database
    .selectEntries(req.params.show, req.params.class)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Create an entry.
app.post("/api/entry", (req, res) => {
  pg_database
    .createEntry(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Update an entry based on it's show and class id.
app.put("/api/entry/:show/:class", (req, res) => {
  pg_database
    .updateEntry(req.params.show, req.params.class, req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Delete an entry.
app.delete("/api/entry/:show/:class", (req, res) => {
  pg_database
    .deleteEntry(req.params.show, req.params.class)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
