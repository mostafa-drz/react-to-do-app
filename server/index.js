const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");
const app = express();
const cookieSession = require('cookie-session')
const { COOKIE_KEY } = require('./config');
require('./services/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());



const authRoute = require('./routes/auth');
app.use(authRoute);

const todoRoutes = require('./routes/todo');
app.use(todoRoutes);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
}



app.listen(process.env.PORT || 3001, () => {
    console.log('server is running');
});