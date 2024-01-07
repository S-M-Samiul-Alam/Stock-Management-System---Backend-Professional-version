const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const path = require('path');



var cors = require("cors");

const apiRouter = require("./routes/api.js");


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors()); 

app.use("/api", apiRouter);

module.exports = app;
