const express = require("express");
const app = express();
const port = process.env.PORT;

//rotta home dell'API
app.get("/api", (req, res) => res.send("<h1>Home API</h1>"));

//verifico da console se il backand funzioni
app.listen(port, console.log("sono in ascolto"));
