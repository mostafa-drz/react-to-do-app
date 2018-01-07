const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogIn = passport.authenticate('local', { session: false });

module.exports = { requireAuth, requireLogIn };