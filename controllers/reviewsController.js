//importo db
const connection = require("./../data/db");

//creo funzione store per creare nuova reviews
function store(req, res) {
  //definisco query da fare al db
  const sql = `INSERT INTO reviews(movie_id, name, vote, text) VALUES ( ?, ?, ?, ?)`;

  //recupero valori proprietà reviews che mi arrivano da frontend
  const { movie_id, name, vote, text } = req.body;

  //eseguo query db
  connection.query(sql, [movie_id, name, vote, text], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.status(201).json({ id: results.insertId, ...req.body });
  });
}

module.exports = { store };
