//importo db
const connection = require("./../data/db");

//funzione rotta index
function index(req, res) {
  //definisco query sql per ricevere l'array con gli oggetti di tutti gli attori
  const sql = "SELECT * FROM actors";
  connection.query(sql, (err, results) => {
    //valuto se ritorna un errore dal db
    if (err) return res.status(500).json({ error: "database not found" });

    //se non ci sono errori stampo array oggetti attori
    res.json(results);
  });
}

module.exports = { index };
