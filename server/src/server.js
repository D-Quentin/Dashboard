// Constant
const {SERVER_HOST, SERVER_PORT} = process.env;

const express = require("express");
const serverRouter = require("./routes/routes.js");
require("./database/models.js")

// App
const server = express();

// Routing
server.use('/', serverRouter);

server.listen(SERVER_PORT, SERVER_HOST);
console.log("Running on http://"+SERVER_HOST+':'+SERVER_PORT);