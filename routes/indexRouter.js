const express = require("express")
const router = express.Router()


// GET Route for homepage
router.get('/', (req, res) =>
  res.sendFile(path.join('/public/index.html'))
);
