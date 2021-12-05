// Constant
const md5 = require('md5');
const {WEATHER_API_KEY, COVID_API_KEY} = process.env
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
  const response = await orm.setWidgets(req.query.uuid, JSON.stringify(req.body));
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
// router.get('/weather', async function(req, res) {
//   const response = await api.axios_request(
//     "https://api.weatherapi.com/v1/current.json?key="+WEATHER_API_KEY+"&q="+req.query.city,
//     "get",
//     {"Content-Type": "application/json"},
//     8000
//   )
//   res.send(response);
// });

// Weather API
function getDayFromDate(date) {
  const new_date = new Date(date);
  const day = new_date.getDay();

  console.log(day);
  switch (day) {
    case (0):
      return "Sun";
    case (1):
      return "Mon";
    case (2):
      return "Tue";
    case (3):
      return "Wed";
    case (4):
      return "Thu";
    case (5):
      return "Fri";
    case (6):
      return "Sat";
  }
}

function getPrevision(json) {
  response = "["; 
  for (var i = 0; json.forecast.forecastday[i] != undefined; i += 1) {
    response += '{"day": "'+getDayFromDate(json.forecast.forecastday[i].date)+'", "min": '+Math.floor(json.forecast.forecastday[i].day.mintemp_c)+', "max": '+Math.floor(json.forecast.forecastday[i].day.maxtemp_c)+'},';
  }
  response = response.slice(0, -1);
  response += "]";
  return (response);
}

router.get('/weather', async function(req, res) {
  const response = await api.axios_request(
    "https://api.weatherapi.com/v1/forecast.json?key="+WEATHER_API_KEY+"&q="+req.query.city+"&days="+req.query.days,
    "get",
    {"Content-Type": "application/json"},
    8000
  );
  const tmp_str = 
  '{'+
    '"city": "' + response.location.name + '",' +
    '"tempNow": "' + response.current.temp_c + '",'+
    '"prevision": ' + getPrevision(response) +
  '}';
  json = JSON.parse(tmp_str);
  res.send(json);
});

// Covid API
router.get('/covid', async function(req, res) {
  const response = await api.axios_request(
    "https://covid-193.p.rapidapi.com/statistics?country=" + req.query.country,
    "get",
    {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": COVID_API_KEY
    },
    8000
  );
  const tmp_str = 
  '{'+
    '"country": "' + response.response[0].country + '",' +
    '"population": ' + response.response[0].population + ',' +
    '"active_cases": ' + response.response[0].cases.active + ',' +
    '"total_cases": ' + response.response[0].cases.total + ',' +
    '"total_deaths": ' + response.response[0].deaths.total + ',' +
    '"recovered_cases": ' + response.response[0].cases.recovered +
  '}';
  console.log(tmp_str);
  json = JSON.parse(tmp_str);
  res.send(json);
});

// About
function getHost(req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

function getSecondSinceEpoch() {
  return (new Date().getTime());
}

router.get("/about.json", async function(req, res) {
  const tmp_str = 
  '{'+
    '"client": {"host": "'+getHost(req)+'"},'+
    '"server": {'+
      '"current_time": '+getSecondSinceEpoch()+','+
      '"services": [{'+
        '"name": "weather",' +
        '"size": ["small", "medium"],'+
        '"widgets": [{'+
          '"name": "city_temperature",'+
          '"description": "Display the current temperature for a given city",'+
          '"params": [{'+
            '"name": "city",'+
            '"type": "string"'+
          '}]'+
        '}, {'+
        '"name": "covid",' +
        '"widgets": [{'+
          '"name": "covid_cases",'+
          '"size": ["small", "medium"],'+
          '"description": "Display the current covid situation for a given country",'+
          '"params": [{'+
            '"name": "city",'+
            '"type": "string"'+
          '}]'+
        '}]'+
      '}]'+
    '}'+
  '}';
  console.log(tmp_str);
  json = JSON.parse(tmp_str);
  console.log(json);
  res.send(tmp_str);
});

errorRoutes(router);

module.exports = router;