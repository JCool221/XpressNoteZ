const express = require("express")
const app = express();

const notesRouter = require('./notes');


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join('/public/index.html'))
);
app.use("/notes", notesRouter)

module.exports = app;