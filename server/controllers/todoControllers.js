const ToDo = require("../models/todo");
const moment = require('moment');

const getUserToDos = (req, res, next) => {
    ToDo.find({ _user: req.user.id, deleted: false }).sort({ date: 1, createdDate: 1 })
        .then(todos => {
            res.status(200).send({ todos });
        })
        .catch(error => {
            res.status(500).send({ message: "Internal server error happened" });
        });
}

const getADayToDos = async(req, res, next) => {
    try {
        let { date } = req.body;
        date = date || new Date();
        const day = moment(date).startOf('day');
        const dayPlusOne = moment(day).add(1, 'days');

        const todos = await ToDo.find({ _user: req.user.id, deleted: false, date: { $gte: day.toDate(), $lt: dayPlusOne.toDate() } })
            .sort({ date: 1, createdDate: 1 });
        res.status(200).send({ todos });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
}

const addToDo = (req, res, next) => {
    const { description, date } = req.body;
    if (!description) {
        return res
            .status(400)
            .send({ message: "You should provide a description for your todo" });
    }
    ToDo.create({ _user: req.user.id, description, date: date || null })
        .then(todo => {
            res.status(200).send(todo);
        })
        .catch(error => {
            res.status(500).send({ message: "Internal error happened" });
        });
}

const upddateAToDo = (req, res, next) => {
    const { _id } = req.body;
    if (!_id) {
        return res.status(400).send({ message: "Bad request" });
    }
    ToDo.findById(_id)
        .then(todo => {
            if (!todo) {
                return res.status(400).send({ message: "Bad request" });
            }
            if (todo._user.toString() === req.user.id) {
                Object.keys(req.body).forEach(key => {
                    todo[key] = req.body[key];
                });
                todo
                    .save()
                    .then(updated => {
                        res.status(200).send(updated);
                    })
                    .catch(error => {
                        res.status(500).send({ message: "Internal error happened" });
                    });
            } else {
                return res
                    .status(401)
                    .send({ message: "You are not authorized to complete this action" });
            }
        })
        .catch(error => {
            res.status(500).send({ message: "Internal error happened" });
        });
}

const deleteAToDo = (req, res, next) => {
    const _id = req.params.id;
    if (!_id) {
        return res.status(400).send({ message: "Bad request" });
    }
    ToDo.findById(_id)
        .then(todo => {
            if (!todo) {
                return res.status(400).send({ message: "Bad request" });
            }
            if (todo._user.toString() === req.user.id) {
                todo.deleted = true;
                todo
                    .save()
                    .then(updated => {
                        res.status(200).send(updated);
                    })
                    .catch(error => {
                        res.status(500).send({ message: "Internal error happened" });
                    });
            } else {
                return res
                    .status(401)
                    .send({
                        message: "You are not authorized to complete this action"
                    });
            }
        })
        .catch(error => {
            res.status(500).send({ message: "Internal error happened" });
        });
}
module.exports = { getUserToDos, addToDo, upddateAToDo, deleteAToDo, getADayToDos };