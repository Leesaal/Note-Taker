const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;
const path = require("path");
const fs = require("fs");
const notes = require("./routes/notes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
