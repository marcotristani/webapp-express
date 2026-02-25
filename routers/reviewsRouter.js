const express = require("express");
const reviewsRouter = express.Router();

//importo controller reviews
const reviewsController = require("./../controllers/reviewsController");

//definisco rotta router
reviewsRouter.post("/add", reviewsController.store);

module.exports = reviewsRouter;
