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

module.exports = router;
