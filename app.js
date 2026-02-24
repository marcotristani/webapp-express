const express = require("express");
const app = express();
const port = process.env.PORT;
//importo cors per rendere accessibile le chiamate backend dal frontend
const cors = require("cors");

//importo routers
const moviesRouter = require("./routers/moviesRouter");
const actorsRouter = require("./routers/actorsRouter");

//importo middleweres per gestione errori
const errorServer = require("./middleweres/errorServer");
const notFound = require("./middleweres/notFound");

//attivo middlewere per prendere body in ingresso
app.use(express.json());

//attivo cors con accesso all'indirizzo del mio forntend
app.use(cors({ origin: "http://localhost:5173" }));

//attivo cartella public per file statici
app.use(express.static("public"));

//rotta home dell'API
app.get("/api", (req, res) => res.send("<h1>Home API</h1>"));

//rotte routers
app.use("/api/movies", moviesRouter);
app.use("/api/actors", actorsRouter);

//attivo middlewere per errore server
app.use(errorServer);

//attivo middlewere per gestione errore in caso di endpoint non corretto
app.use(notFound);

//verifico da console se il backand funzioni
app.listen(port, console.log("sono in ascolto"));
