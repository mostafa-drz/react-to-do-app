const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const passport = require('passport');
require('./services/db');

app.use(cors());

app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authRoute = require('./routes/auth');
app.use(authRoute);

const todoRoutes = require('./routes/todo');
app.use(todoRoutes);

app.listen(process.env.PORT || 3001, () => {
    console.log('server is running');
});