const express = require('express');
const bodyParser = require('body-parser');

const app = express();

require('./services/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authRouter = require('./routers/auth');
app.use(authRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running');
});