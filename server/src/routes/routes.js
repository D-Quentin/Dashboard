// Constant
const {WEATHER_API_KEY} = process.env

const http = require("http");
const errorRoutes = require("./error");
const router = require("express").Router();

// Header
router.use(function (_, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})
//

// Home
router.get('/', (_, res) => {
  res.send('Hello world');
});
//

// Weather API
router.get('/weather/:city/:days', (req, res) => {
  const options = {
    host: "http://api.weatherapi.com/v1",
    path:"/current.json",
    headers: {
      key: WEATHER_API_KEY,
      q: req.params.city,
      days: req.params.days
    },
    method: "GET"
  }
  http.request(options, callback).end();
});
//

callback = function(response) {
  var str= "";

  response.on("data", function(chunck) {
    str += chunck;
  });

  response.on("end", function () {
    console.log(str);
  })
}

// Authentification
// const isLoggedIn = (req, res, next) => {
//   if (req.user) {
//       next();
//   } else {
//       res.sendStatus(401);
//   }
// }

// router.get('/google', 
//   passport.authenticate(
//     'google', {scope: ["email", "profile"]}
//   )
// );

// router.get('/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/',
//   }),
//   function(req, res) {
//     res.redirect('/success');
//   }
// );

// router.get('/success', isLoggedIn, (req, res) => {
//   res.send("Welcome "+req.user.email);
// });

// router.get('/logout', (req, res) => {
//   req.session = null;
//   req.logout();
//   res.redirect('/');
// });
// //


// API
router.get('/test', function(_, res) {
  res.status(200).send("test")
});

router.get('/api/test', function(_, res) {
  res.send({
    msg: "Hello"
  })
});
//

errorRoutes(router);

module.exports = router;