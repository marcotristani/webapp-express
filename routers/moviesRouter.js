const express = require("express");
const moviesRouter = express.Router();

//prova rotta index
moviesRouter.get("/", (req, res) => res.send("prova router"));

module.exports = moviesRouter;
