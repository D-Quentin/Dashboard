
'use strict';


// Constant
const PORT = 8080
const HOST = "0.0.0.0";
const express = require("express");
const serverRouter = require("./routes/routes.js");
const databaseConnector = require("./models/index.js")

// App
const app = express();
app.use('/', serverRouter);

app.listen(PORT, HOST);
console.log("Running on http://"+PORT+':'+PORT);