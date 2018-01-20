const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");
const app = express();
const path = require('path');

require('./services/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());

app.use(express.static(path.resolve(__dirname, '../frontend/build')));

const authRoute = require('./routes/auth');
app.use(authRoute);

const todoRoutes = require('./routes/todo');
app.use(todoRoutes);


app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../fontend/build', 'index.html'));
});


app.listen(process.env.PORT || 3001, () => {
    console.log('server is running');
});