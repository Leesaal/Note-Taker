const express = require("express");
const path = require("path");
const notes = require("./routes/notes");
const api = require("./routes/api");

// initialise express
const app = express();

// PORT
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/notes", notes);
app.use("/api/notes", api);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

//listen to port
app.listen(PORT, () =>
  console.log(`App listening on http://localhost:${PORT}`)
);
