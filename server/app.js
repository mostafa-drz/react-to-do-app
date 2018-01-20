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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

app.listen(process.env.PORT || 3001, () => {
    console.log('server is running');
});