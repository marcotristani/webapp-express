//importo db
const connection = require("./../data/db");

function index(req, res) {
  //definisco query sql
  const sql = "SELECT * FROM movies";

  //eseguo query al db
  connection.query(sql, (err, results) => {
    //valuto se ritorna un errore dal db
    if (err) return res.status(500).json({ error: "database not found" });

    //costruisco l'oggetto di riposta con dati arrivati dal db
    const resObj = {
      n_movies: results.length,
      movies: results,
    };

    //se non ci sono errori ritorna l'oggetto di riposta
    res.json(resObj);
  });
}

module.exports = { index };
