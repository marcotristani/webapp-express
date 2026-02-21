const express = require("express");
const actorsRouter = express.Router();

//importo controller
const actorsController = require("./../controllers/actorsController");

//rotta index
actorsRouter.get("/", actorsController.index);

module.exports = actorsRouter;
