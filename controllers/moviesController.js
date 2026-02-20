//importo db
const connection = require("./../data/db");

//funzione per rotta index
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

//funzione per rotta show
function show(req, res) {
  //definisco query sql
  const sqlMovies = "SELECT * FROM movies WHERE id = ? ";

  //recupero id da parametro query API
  const { id } = req.params;
  //eseguo query al db
  connection.query(sqlMovies, [id], (err, results) => {
    //valuto se ritorna un errore dal db
    if (err) return res.status(500).json({ error: "database not found" });
    //valuto se non c'è il film richiesto
    if (results.length === 0)
      return res
        .status(404)
        .json({ error: "not found", message: "film non trovato" });

    //costruisco l'oggetto di riposta con dati arrivati dal db
    const movie = results[0];

    //se non ci sono errori ritorna l'oggetto di riposta
    res.json(movie);
  });
}
module.exports = { index, show };
