const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  start: {
    type: String,
    required: true 
  },
  stop: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }

})
module.exports = mongoose.model('Todo', TodoSchema);
