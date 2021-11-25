// Constant
const errorRoutes = require("./error");
const passport = require("passport");
const router = require("express").Router();

// Header
router.use(function (_, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})
//

// Home
router.get('/', (_, res) => {
  res.status(200).send("Hello World");
});
//

// Authentification
const isLoggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}

router.get('/google', 
  passport.authenticate(
    'google', {scope: ["email", "profile"]}
  )
);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  function(req, res) {
    res.redirect('/success');
  }
);

router.get('/success', isLoggedIn, (req, res) => {
  res.send("Welcome "+req.user.email);
});

router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});
//


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