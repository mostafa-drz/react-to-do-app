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
    createdDate: {
        type: Date,
        default: new Date()
    },
    _user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    completed: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    reminder: {
        enabled: {
            type: Boolean,
            default: false,
        },
        remindAt: {
            type: Date,
            default: null,
        },
        batchId: {
            type: String,
            default: null
        }
    }
});

module.exports = mongoose.model('ToDo', todoSchema);