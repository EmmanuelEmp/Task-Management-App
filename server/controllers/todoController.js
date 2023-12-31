
const Todo = require('../models/todoModel')
const mongoose = require('mongoose');

 /**
  * /
  *  GET home page
  */

 exports.homepage = async (req, res) => {
   const locals = {
      title: 'Add new ToDo'
   }
   try {
      const todos = await Todo.find({ user: req.user._id})
      res.render('index', {locals, todos})
   } catch (error) {
      console.log(error);
   }
 }
 
  /**
  * GET /
  * New Task Form
  */
  exports.addTask = async (req, res) => {

   const locals = {
      title: 'Add new ToDo'
   }
   res.render('list/add', locals);
}

 /**
  * POST /
  * Add New Task
  */
 exports.postTask = async (req, res) => {
  const newTodo = new Todo({
    task: req.body.task,
    start: req.body.start,
    stop: req.body.stop,
    user: req.user._id

  });

  try {
   await Todo.create(newTodo);
   res.redirect('/api/todo');
  } catch (error) {
     console.log(error);
  }
}
  
/**
 * GET /
 * View a Todo
 */
exports.viewTask = async(req, res) => {

   try {
      const todo = await Todo.findOne({_id: req.params.id});
   
   const locals = {
      title: 'Add new ToDo'
   }
   res.render('list/view', { locals, todo});
   } catch (error) {
      console.log(error);
   }
}

/**
 * GET /
 * Todo
 */
exports.editTask = async(req, res) => {

   try {
      const todo = await Todo.findOne({_id: req.params.id});
   
   const locals = {
      title: 'Add new ToDo'
   }
   res.render('list/edit', { locals, todo});
   } catch (error) {
      console.log(error);
   }
}

/**
 * PUT /
 * Update task
 */
exports.updateTask = async(req, res) => {

   try {
     await Todo.findByIdAndUpdate(req.params.id, {
      task: req.body.task,
      start: req.body.start,
      stop: req.body.stop,
      updateAt: Date.now(),
     });
     
     res.redirect(`/api/todo`);
   }
    catch (error) {
      console.log(error);
   }

} 

/**
 * Delete /
 * Delete task
 */

exports.deleteTask = async(req, res) => {
   try {
      await Todo.deleteOne({_id: req.params.id});
      res.redirect('/api/todo');
   } catch (error) {
      console.log(error);
   }
} 