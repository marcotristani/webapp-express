function errorServer(err, req, res, next) {
  res.status(500);
  res.json({ error: "error internal server", message: err.message });
}

module.exports = errorServer;
