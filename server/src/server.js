// Constant
const {SERVER_HOST, SERVER_PORT} = process.env;

const express = require("express");
const serverRouter = require("./routes/routes.js");
// require("./models/index.js")

// App
const app = express();

// Routing
app.use('/', serverRouter);

app.listen(SERVER_PORT, SERVER_HOST);
console.log("Running on http://"+SERVER_HOST+':'+SERVER_PORT);