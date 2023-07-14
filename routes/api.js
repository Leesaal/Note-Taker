const Router = require("express").Router();
const notes = require("../db/db.json");
const fs = require("fs");
const uuid = require("../helpers/uuid");

//Get
Router.get("/", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    try {
      const note = JSON.parse(data);
      return res.json(note);
    } catch (err) {
      console.log(err);
    }
  });
});

module.exports = Router;
