const db = require("./../data/db");

function index(req, res) {
  res.send("prova controller");
}

module.exports = { index };
