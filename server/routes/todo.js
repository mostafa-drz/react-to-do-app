const express = require("express");
const router = express.Router();
const { requireAuth } = require('../middlewares/auth');
const { getUserToDos, addToDo, upddateAToDo, deleteAToDo } = require('../controllers/todoControllers');

router.get('/api/todos', requireAuth, getUserToDos);

router.post('/api/todos', requireAuth, addToDo);

router.put('/api/todos', requireAuth, upddateAToDo);

router.delete('/api/todos', requireAuth, deleteAToDo);

module.exports = router;