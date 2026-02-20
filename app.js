const express = require("express");
const app = express();
const port = process.env.PORT;

//importo routers
const moviesRouter = require("./routers/moviesRouter");

//importo middleweres per gestione errori
const errorServer = require("./middleweres/errorServer");
const notFound = require("./middleweres/notFound");

//attivo cartella public per file statici
app.use(express.static("public"));

//rotta home dell'API
app.get("/api", (req, res) => res.send("<h1>Home API</h1>"));

//rotte routers
app.use("/api/movies", moviesRouter);

//attivo middlewere per errore server
app.use(errorServer);

//attivo middlewere per gestione errore in caso di endpoint non corretto
app.use(notFound);

//verifico da console se il backand funzioni
app.listen(port, console.log("sono in ascolto"));
