// Constant
const {SERVER_HOST, SERVER_PORT} = process.env;
const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const serverRouter = require("./routes/routes.js");
require("./passport.js");
require("./models/index.js")

// App
const app = express();

// Cookies
app.use(cookieSession({
  name: "google-auth-session",
  keys: ["key1", "key2"]
}));

// Google OAuth2
app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use('/', serverRouter);

app.listen(SERVER_PORT, SERVER_HOST);
console.log("Running on http://"+SERVER_HOST+':'+SERVER_PORT);