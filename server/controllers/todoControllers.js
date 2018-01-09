const ToDo = require("../models/todo");


const getUserToDos = (req, res, next) => {
    ToDo.find({ _user: req.user.id })
        .then(todos => {
            res.status(200).send({ todos });
        })
        .catch(error => {
            res.status(500).send("Internal server error happened");
        });
}

const addToDo = (req, res, next) => {
    const { description, date } = req.body;
    if (!description) {
        return res
            .status(400)
            .send("You should provide a description for your todo");
    }
    ToDo.create({ _user: req.user.id, description, date: date || null })
        .then(todo => {
            res.status(200).send(todo);
        })
        .catch(error => {
            res.status(500).send("Internal error happened");
        });
}

const upddateAToDo = (req, res, next) => {
    const { _id } = req.body;
    if (!_id) {
        return res.status(400).send("Bad request");
    }
    ToDo.findById(_id)
        .then(todo => {
            if (!todo) {
                return res.status(400).send("Bad request");
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
                        res.status(500).send("Internal error happened");
                    });
            } else {
                return res
                    .status(401)
                    .send("You are not authorized to complete this action");
            }
        })
        .catch(error => {
            res.status(500).send("Internal error happened");
        });
}

module.exports = { getUserToDos, addToDo, upddateAToDo };