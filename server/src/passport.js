const passport = require("passport");
const {GOOGLE_OAUTH_API_KEY, GOOGLE_OAUTH_SECRET} = process.env
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_OAUTH_API_KEY,
    clientSecret: GOOGLE_OAUTH_SECRET,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));