const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController')
const { authUser, checkUser }= require('../middleware/validateToken')

router.get('*', checkUser);

router.get('/', authUser, todoController.homepage);
router.get('/add', authUser, todoController.addTask);
router.post('/add', authUser, todoController.postTask);
router.get('/view/:id', authUser, todoController.viewTask);
router.get('/edit/:id', authUser, todoController.editTask);
router.put('/edit/:id', authUser, todoController.updateTask);
router.delete('/edit/:id', authUser, todoController.deleteTask);



module.exports = router