const express = require("express");
const http = require("http");
const cors = require('cors');


const mongodb = require("./data/database.js");

const bodyParser = require("body-parser");

//const multer  = require('multer');

const app = express();

const port = process.env.PORT || 3000;

//read jsons
app.use(bodyParser.json());
//use cors
app.use(cors());

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  // Responder con un código de estado 500 y un mensaje de error genérico
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/", require("./routes"));

const server = http.createServer(app);

mongodb.initDB((err) => {
  if (err) {
    console.log("Database is not connected!");
    console.log(err);
  } else {
    server.listen(port, () => {
      console.log(`Running on port ${port}`);
      console.log("Database is connected!");
    });
  }
});
