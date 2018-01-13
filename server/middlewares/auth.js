const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogIn = passport.authenticate('local', { session: false });
const requireGoogleAuth = passport.authenticate("google", {
    scope: ["profile", "email"]
});
const requireGoogleLogIn = passport.authenticate("google");

module.exports = { requireAuth, requireLogIn, requireGoogleAuth, requireGoogleLogIn };