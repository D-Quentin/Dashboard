"use strict";

// Constant
const errorRoutes = require("./error");
const sequelize = require("sequelize");
const router = require("express").Router();

// router.use("/", );

// router.get("/test", test);

router.get('/', (req, res) => {
  res.status(200).send("Hello World");
});

router.get('/test', function(req, res, next) {
  res.status(200).send("test")
});

errorRoutes(router);

module.exports = router;