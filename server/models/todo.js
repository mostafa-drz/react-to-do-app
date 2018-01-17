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

todoSchema.pre('save', function(next) {
    if (!this.reminder.remindAt) {
        this.reminder.remindAt = new Date(new Date(this.date).getDate() - 1).getTime();
    }
});

module.exports = mongoose.model('ToDo', todoSchema);