function notFound(req, res, next) {
  res.status(404);
  res.json({
    error: "not Found",
    message: "endpoint non trovato",
  });
}

module.exports = notFound;
