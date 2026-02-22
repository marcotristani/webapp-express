const express = require("express");
const actorsRouter = express.Router();

//importo controller
const actorsController = require("./../controllers/actorsController");

//rotta index
actorsRouter.get("/", actorsController.index);

//rotta show
actorsRouter.get("/:id", actorsController.show);

//rotta store
actorsRouter.post("/", actorsController.store);

module.exports = actorsRouter;
