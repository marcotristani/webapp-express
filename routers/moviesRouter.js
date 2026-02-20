const express = require("express");
const moviesRouter = express.Router();

//importo controllers
const moviesController = require("./../controllers/moviesController");

//prova rotta index
moviesRouter.get("/", moviesController.index);

module.exports = moviesRouter;
