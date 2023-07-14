const Router = require("express").Router();
const path = require("path");

Router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/notes.html"));
});

module.exports = Router;
