const Router = require("express").Router();
const fs = require("fs");
const uuid = require("uuid");

Router.get("/", (req, res) => {
  fs.readFile("../db/db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Unable to read notes");
    }

    try {
      const notes = JSON.parse(data);
      res.json(notes);
    } catch (err) {
      res.status(500).send("Unable to read notes");
    }
  });
});

// Post
Router.post("/", (req, res) => {
  fs.readFile("../db/db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Note has not been posted");
    }

    try {
      const notes = JSON.parse(data);
      const newNote = { id: uuid.v4(), ...req.body };
      notes.push(newNote);

      fs.writeFile("../db/db.json", JSON.stringify(notes), (err) => {
        if (err) {
          res.status(500).send("Note has not been posted");
        } else {
          res.send("Note has been created");
        }
      });
    } catch (err) {
      res.status(500).send("Note has not been posted");
    }
  });
});

// Delete
Router.delete("/:id", (req, res) => {
  const noteId = req.params.id;

  fs.readFile("../db/db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Note has not been deleted");
      return;
    }

    try {
      const notes = JSON.parse(data);
      const filterDb = notes.filter((obj) => obj.id !== noteId);

      fs.writeFile("../db/db.json", JSON.stringify(filterDb), (err) => {
        if (err) {
          res.status(500).send("Note has not been deleted");
        } else {
          res.send("Note was deleted");
        }
      });
    } catch (err) {
      res.status(500).send("Note has not been deleted");
    }
  });
});

module.exports = Router;
