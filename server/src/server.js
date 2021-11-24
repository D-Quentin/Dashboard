// Constant
const PORT = 8080
const HOST = "0.0.0.0";
const express = require("express");
const serverRouter = require("./routes/routes.js");

// App
const app = express();
app.use('/', serverRouter);

app.listen(PORT, HOST);
console.log("Running on http://"+HOST+':'+PORT);