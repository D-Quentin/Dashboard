// Constant
const {WEATHER_API_KEY} = process.env
const {v4: uuidv4} = require('uuid');
const errorRoutes = require("./error");
const router = require("express").Router();
const orm = require("../database/models.js");
const api = require("../api/api_request.js");

// Home
router.get('/', (_, res) => {
  res.send('Hello world');
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
  res.send(JSON.parse('{"success": false, "msg": "Username taken"}'));
  return;
});

router.get('/login', async function(req, res) {
  const uuid = await orm.getUuidFromUsername(req.query.username, req.query.password);
  if (uuid === null) {
    res.send(JSON.parse('{"success": false, "msg": "Username or password invalid"}'));
    return;
  }
  res.send(JSON.parse('{"success": true, "uuid": "'+uuid+'"}'));
  return;
});
//

// Widget management
router.get("/add/widget", async function(req, res) {
  const id = await orm.getUserFromUuid(req.query.uuid);
  if (uuid === null) {
    res.send(JSON.parse('{"success": false, "msg": "uuid is invalid'))
    return;
  }
  orm.addWidget(id, req.query.type, req.query.order, req.query.widget);
  res.send(JSON.parse('{"success": true'));
  return;
})
//

router.get("get/widgets", async function(req, res) {
  const id = await orm.getUserFromUuid(req.query.uuid);
  if (uuid === null) {
    res.send(JSON.parse('{"success": false, "msg": "uuid is invalid'))
    return;
  }
  orm.getAllWidgetsFromUser(id);
  res.send(JSON.parse('{"success": true'));
})

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