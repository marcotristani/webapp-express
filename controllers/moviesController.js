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

    // vado ad aggiornare la proprietà immagine con il path giusto
    const movies = results.map((movie) => {
      return { ...movie, image: req.imagePath + movie.image };
    });

    //costruisco l'oggetto di riposta con dati arrivati dal db
    const resObj = {
      n_movies: movies.length,
      movies: movies,
    };

    //se non ci sono errori ritorna l'oggetto di riposta
    res.json(resObj);
  });
}

//funzione per rotta show
function show(req, res) {
  //definisco query sql
  const sqlMovies = "SELECT * FROM movies WHERE id = ? ";

  //definisco query per reviews
  const sqlReviews = "SELECT * FROM reviews WHERE movie_id = ?";

  //definisco query per actors
  const sqlActors = `
  SELECT actors.name, actors.surname 
FROM actor_movie
JOIN actors ON actor_movie.actor_id = actors.id
JOIN movies ON actor_movie.movie_id = movies.id
WHERE movies.id = ? AND actors.main_actor = 1`;

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
    const movie = { ...results[0], image: req.imagePath + results[0].image };

    //eseguo query per reviews relativo al film con l'id ricercato
    connection.query(sqlReviews, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "database not found" });

      //se non ci sono errori nella chiamata
      movie.reviews = results;

      //eseguo query per actors relativo al film con l'id ricercato
      connection.query(sqlActors, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "database not found" });

        //creo array da andare a salvare nella proprietà actors con nome e cognome attori
        const main_actors = results.map(
          (actor) => `${actor.name} ${actor.surname}`,
        );

        //se non ci sono errori nella chiamata
        movie.main_actors = main_actors;

        //se non ci sono errori ritorna l'oggetto di riposta
        res.json(movie);
      });
    });
  });
}
module.exports = { index, show };
