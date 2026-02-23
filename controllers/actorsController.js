//importo db
const connection = require("./../data/db");

//funzione rotta index
function index(req, res) {
  //definisco query sql per ricevere l'array con gli oggetti di tutti gli attori
  const sql = "SELECT * FROM actors";
  connection.query(sql, (err, results) => {
    //valuto se ritorna un errore dal db
    if (err) return res.status(500).json({ error: "database not found" });

    //oggetto di risposta
    const resObj = { n_actors: results.length, actors: results };
    //se non ci sono errori stampo array oggetti attori
    res.json(resObj);
  });
}

//funzione rotta show
function show(req, res) {
  const sql = `SELECT actors.*, actors_details.birth_date, actors_details.death_date,actors_details.country, actors_details.award
FROM actors
JOIN actors_details ON actors.id = actors_details.actor_id
WHERE actors.id = ?`;

  const { id } = req.params;
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "database not found" });

    if (results.length === 0)
      return res
        .status(404)
        .json({ error: "not Found", message: "attore non trovato" });

    res.json(results[0]);
  });
}

//funzione rotta store
function store(req, res) {
  const sql1 = `
  INSERT INTO actors (name, surname, main_actor)
VALUES (?, ?, ?)`;

  const sql2 = `INSERT INTO actors_details (actor_id, birth_date, death_date, country, award)
VALUES (LAST_INSERT_ID(), ?, ?, ?, ?);`;

  const { name, surname, main_actor, birth_date, death_date, country, award } =
    req.body;

  connection.query(sql1, [name, surname, main_actor], (err, results) => {
    if (err) return res.status(500).json(err);

    const newid = results.insertId;

    connection.query(
      sql2,
      [birth_date, death_date, country, award],
      (err, results) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({ id: newid, ...req.body });
      },
    );
  });
}

module.exports = { index, show, store };
