const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Here we go');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running');
});