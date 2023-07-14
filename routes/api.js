const Router = require("express").Router();
const notes = require("../db/db.json");
const fs = require("fs");
const uuid = require("uuid");

//Get
Router.get("/", (req, res) => {
  fs.readFile("../db/db.json", "utf-8", (err, data) => {
    try {
      const note = JSON.parse(data);
      return res.json(note);
    } catch (err) {
      console.log(err);
    }
  });
});

//Post
Router.post("/", (req, res) => {
  const newNote = { id: uuid.v4(), ...req.body };
  notes.push(newNote);

  // write in db json file
  try {
    fs.writeFile("../db/db.json", JSON.stringify(notes), (err) => {
      res.send("Note has been created");
    });
  } catch (err) {
    res.send("Error posting note");
  }
});

//Delete
Router.delete("/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Failed to read file to delete note");
      return;
    }
    try {
      var noteData = JSON.parse(data);
      noteData = noteData.filter((item) => item.id !== id);

      // write to db json file
      fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
        if (err) {
          res.status(500).send("Failed to write deleted note");
        } else {
          res.send("Note has been deleted");
        }
      });
    } catch (err) {
      res.send("Error deleting note");
    }
  });
});

module.exports = Router;
