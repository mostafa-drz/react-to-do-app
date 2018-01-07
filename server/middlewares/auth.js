const passport = require('passport');

module.exports.requireAuth = passport.authenticate('jwt', { session: false });
module.exports.requireLogIn = passport.authenticate('local', { session: false });