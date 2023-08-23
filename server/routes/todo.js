const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController')




router.get('/', todoController.homepage);
router.get('/add', todoController.addTask);
router.post('/add', todoController.postTask);
router.get('/view/:id', todoController.viewTask);
router.get('/edit/:id', todoController.editTask);
router.put('/edit/:id', todoController.updateTask)
router.delete('/edit/:id', todoController.deleteTask);



module.exports = router;