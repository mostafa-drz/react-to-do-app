const passport = require('passport');
const User = require('../models/user');
const { JWT_SECRET_KEY } = require('../config/index');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Passport local staretegy for sign in
const localStrategyOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localStrategyOptions, (email, password, done) => {
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return done(null, false);
            }
            user.comparePassword(password, (error, isMatch) => {
                if (error) {
                    return done(error);
                }
                if (!isMatch) {
                    return done(null, false);
                }
                return done(null, user);
            });
        })
        .catch((error) => {
            return done(error);
        });
});

//JWT strategy
const JwtStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET_KEY
};

const JwtLogin = new JwtStrategy(JwtStrategyOptions, (payload, done) => {
    User.findById(payload.sub)
        .then((user) => {
            if (!user) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        })
        .catch((error) => {
            return done(error);
        });
});

passport.use(localLogin);
passport.use(JwtLogin);