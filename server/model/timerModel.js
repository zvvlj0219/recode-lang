const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema(
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
    study_time:{
      type:Number,
      required:true,
    },
    timestamps:{
      type:Object,
      required:false,
    },
  },
  {
    collection:'timer'
  }
);

module.exports = mongoose.model('Timer',timerSchema);
