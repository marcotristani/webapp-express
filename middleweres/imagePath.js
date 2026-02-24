function imagePath(req, res, next) {
  //vado ad aggiungere a req la proprietà imagePath dove andrò a salvare la base del path per richiamare l'immagine dal mio backend
  req.imagePath = `${req.protocol}://${req.get("host")}/api/movies/img/`;

  //vado avanti
  next();
}

module.exports = imagePath;
