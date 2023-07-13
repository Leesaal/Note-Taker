const route = require("express").Router();
const notes = require("../db/db.json");
// const uuid = require("uuid");
const fs = require("fs");

//Get
route.get("/", (req, res) => {});

module.exports = route;
