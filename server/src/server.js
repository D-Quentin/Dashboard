
'use strict';

const express = require("express");

// Constant
const PORT = 8080
const HOST = "0.0.0.0";
const serverRouter = require("./routes/routes.js");

// App
const app = express();
app.use('/', serverRouter);

app.listen(PORT, HOST);
console.log("Running on http://"+PORT+':'+PORT);