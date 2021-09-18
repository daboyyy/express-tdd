var express = require('express');
var createError = require('http-errors');
var router = express.Router();

const todos = [{ id: 1, name: 'Do something', completed: false }]

// /todos/
router.get('/', function(req, res, next) {
    res.json(todos)
});

router.get('/:id', function(req, res, next) {
    const foundTodo = todos.find(todo => todo.id === Number(req.params.id))

    if(!foundTodo){
        return next(createError(404, 'Not Found'))
    }

    res.json(foundTodo)
})

router.post('/', function(req, res, next) {
    const { body } = req;

    const newTodo = {
        id: todos.length + 1,
        name: body.name,
        completed: false
     }

     todos.push(newTodo);

     res.status(201).json(newTodo);
})

module.exports = router;
