const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config/index');

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to the database....');
    })
    .catch((error) => {
        console.log(error);
    });