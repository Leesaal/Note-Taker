const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;
const path = require("path");
const fs = require("fs");
const notes = require("./routes/notes");
const api = require("./routes/api");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", api);
app.use("/notes", notes);

//listen to port
app.listen(PORT, () =>
  console.log(`App listening on http://localhost:${PORT}`)
);
