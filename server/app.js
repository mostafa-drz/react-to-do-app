const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");
const app = express();
require('./services/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());

const authRoute = require('./routes/auth');
app.use(authRoute);

const todoRoutes = require('./routes/todo');
app.use(todoRoutes);

app.listen(process.env.PORT || 3001, () => {
    console.log('server is running');
});