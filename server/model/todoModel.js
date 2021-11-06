const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    email:{
      type:String,
      required:true,
    },
    language:{
      type:String,
      required:true,
    },
    created_at:{
      type:String,
      required:true,
    },
    text:{
      type:String,
      required:true,
    },
    checked:{
      type:Boolean,
      required:true,
    },
    study_time:{
      type:Number,
      required:true,
    },
    isDone:{
      type:Boolean,
      required:true,
    },
    timestamps:{
      type:Object,
      required:false,
    }
  },
  {
    collection:'todo'
  }
);

module.exports = mongoose.model('Todo',todoSchema)