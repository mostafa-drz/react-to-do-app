const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date(),
    },
    _user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('ToDo', todoSchema);