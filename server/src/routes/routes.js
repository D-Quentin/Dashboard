// Constant
const md5 = require('md5');
const {WEATHER_API_KEY} = process.env
const {v4: uuidv4} = require('uuid');
const errorRoutes = require("./error");
const router = require("express").Router();
const orm = require("../database/models.js");
const api = require("../api/api_request.js");
const {OAuth2Client} = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_API_KEY)
const express = require("express");
const cors = require("cors");

router.use(express.static('public'));
router.use(express.json());

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

router.use(cors(corsOpts));

// Home
router.get('/', (_, res) => {
  res.status(200).send('Hello world');
});
//

// Login & register
router.get('/register', async function(req, res) {
  const user_exist = await orm.isUsernameTaken(req.query.username);
  if (!user_exist) {
    const uuid = uuidv4();
    orm.addUser(req.query.username, req.query.password, uuid)
    res.send(JSON.parse('{"success": true, "uuid": "'+uuid+'"}'));
    return;
  }
  res.send(JSON.parse('{"success": false, "msg": "User already exist"}'));
  return;
});

router.get('/login', async function(req, res) {
  const uuid = await orm.getUuidFromUsernameAndPassword(req.query.username, req.query.password);
  if (uuid === null) {
    res.send(JSON.parse('{"success": false, "msg": "Username or password invalid"}'));
    return;
  }
  res.send(JSON.parse('{"success": true, "uuid": "'+uuid+'"}'));
  return;
});
//

// Google login & register
router.post("/oauth/login", async function (req, res) {
  const ticket = await client.verifyIdToken({
    idToken: req.body.token,
    audience: process.env.GOOGLE_OAUTH_API_KEY
  });
  if (ticket === null) {
    res.send(JSON.parse('{"success": false, "msg": "Invalid token"}'));
    return;
  }
  const {name, email} = ticket.getPayload();
  const uuid = await orm.getUuidFromUsername(email);

  if (uuid === null) {
    res.send(JSON.parse('{"success": false, "msg": "Username or password invalid"}'));
    return;
  }
  res.send(JSON.parse('{"success": true, "username": "'+name+'", "uuid": "'+uuid+'"}'));
  return;
});

router.post("/oauth/register", async function (req, res) {
  const ticket = await client.verifyIdToken({
    idToken: req.body.token,
    audience: process.env.GOOGLE_OAUTH_API_KEY
  });
  if (ticket === null) {
    res.send(JSON.parse('{"success": false, "msg": "Invalid token"}'));
    return;
  }
  const {name, email} = ticket.getPayload();
  const user_exist = await orm.isUsernameTaken(email);

  if (!user_exist) {
    const uuid = uuidv4()
    orm.addUser(email, md5(req.body.token), uuid)
    res.send(JSON.parse('{"success": true, "username": "'+name+'", "uuid": "'+uuid+'"}'));
    return;
  }
  res.send(JSON.parse('{"success": false, "msg": "User already exist"}'));
  return;
});
//

// Widget management
router.post("/set/widgets", async function(req, res) {
  const response = await orm.setWidgets(req.query.uuid, req.body.widgets);
  res.send(JSON.parse('{"success": true}'));
  return;
});

router.get("/get/widgets", async function(req, res) {
  json = await orm.getAllWidgetsFromUser(req.query.uuid);
  if (json === null) {
    res.send("");
    return;
  }
  res.send(JSON.parse(json));
  return;
});
//

// Weather Widget
router.get('/weather/:city', async function(req, res) {
  const response = await api.axios_request(
    "https://api.weatherapi.com/v1/current.json?key="+WEATHER_API_KEY+"&q="+req.params.city,
    "get",
    {"Content-Type": "application/json"},
    8000
  )
  res.send(response);
});

router.get('/weather/:city/:days', async function(req, res) {
  const response = await api.axios_request(
    "https://api.weatherapi.com/v1/forecast.json?key="+WEATHER_API_KEY+"&q="+req.params.city+"&days="+req.params.days,
    "get",
    {"Content-Type": "application/json"},
    8000
  );
  res.send(response);
});

errorRoutes(router);

module.exports = router;