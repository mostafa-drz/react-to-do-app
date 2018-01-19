const express = require("express");
const router = express.Router();
const { requireAuth } = require('../middlewares/auth');
const { getUserToDos, addToDo, upddateAToDo, deleteAToDo, getADayToDos } = require('../controllers/todoControllers');
const { sendToDoReminder } = require('../services/sendGrid');

const ToDo = require('../models/todo');
router.get('/api/todos', requireAuth, getUserToDos);

router.post('/api/todos', requireAuth, addToDo);

router.put('/api/todos', requireAuth, upddateAToDo);

router.delete('/api/todos/:id', requireAuth, deleteAToDo);

router.get('/api/todos/date', requireAuth, getADayToDos);

//DOn't forget to put the req auth
router.get('/api/todos/:id/reminder', async(req, res) => {
    const todo = await ToDo.findById(req.params.id);
    if (!todo) {
        return res.status(404).send({ message: 'ToDo not found' });
    }
    res.status(200).send({ reminder: todo.reminder })
});

router.post('/api/todos/:id/reminder', async(req, res) => {
    try {
        const { remindAt } = req.body;
        const todo = await ToDo.findById(req.params.id);
        if (todo.reminder.batchId || todo.reminder.enabled) {
            return res.status(400).send({ message: 'A reminder already have been set for this task', reminder: todo.reminder });
        }
        todo.reminder.remindAt = new Date(remindAt);
        todo.reminder.enabled = true;

        const result = await sendToDoReminder('mostafa69d@gmail.com', todo)

        //call function to schedule the email for sending email with send grid
        //here you should update the batchid
        const todoWithReminder = await todo.save();
        if (!todoWithReminder) {
            return res.status(500).send({ mesage: 'Something went wrong on the server' });
        }

        res.status(200).send({ reminder: todoWithReminder.reminder });
    } catch (error) {
        res.status(500).send({ message: 'something went wrong' });
    }
});

router.put('/api/todos/:id/reminder', async(req, res) => {

    const { remindAt } = req.body;
    const todo = await ToDo.findById(req.params.id);
    if (!todo.reminder.enabled) {
        return res.status(404).send({ message: 'No Reminder found' });
    }

    todo.reminder.remindAt = remindAt;
    //call the send email from send grid and update the bacth id, it means stop email , and start a new one
    //here you should update the batchid as well

    const updatedToDoReminder = await todo.save();
    if (!updatedToDoReminder) {
        return res.status(500).send({ message: 'Something went wrong on the server' });
    }

    res.status(200).send({ reminder: updatedToDoReminder.reminder });

});

router.delete('/api/todos/:id/reminder', async(req, res) => {
    const todo = await ToDo.findById(req.params.id);
    if (todo.reminder.enabled) {
        //call function to cancel the email scheduled on send grid
        todo.reminder.remindAt = null;
        todo.reminder.batchId = null;
        todo.reminder.enabled = false;
        const deltedReminderToDo = await todo.save();

        if (!deltedReminderToDo) {
            return res.status(500).send({ message: 'Something went wrong on the server' });
        }

        res.status(200).send();
    } else {
        return res.status(404).send({ message: 'No reminder found' });
    }

});

module.exports = router;