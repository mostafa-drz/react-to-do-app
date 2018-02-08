const passport = require('passport');
const User = require('../models/user');
const { JWT_SECRET_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../config/index');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


//passport serialize deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

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

//Passport google strategy
const googleLogin = new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    async(accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }
            const user = await new User({ googleId: profile.id, email: profile.emails[0].value }).save();
            done(null, user);
        } catch (error) {
            return Promise.reject(error);
        }
    }
)

passport.use(localLogin);
passport.use(JwtLogin);
passport.use(googleLogin);