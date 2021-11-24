// Constant
const errorRoutes = require("./error");
const sequelize = require("sequelize");
const router = require("express").Router();

router.use(function (_, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

router.get('/', (_, res) => {
  res.status(200).send("Hello World");
});

router.get('/test', function(_, res) {
  res.status(200).send("test")
});

router.get('/api/test', function(_, res) {
  res.send({
    msg: "Hello"
  })
});

errorRoutes(router);

module.exports = router;