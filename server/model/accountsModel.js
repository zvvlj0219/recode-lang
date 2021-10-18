const mongoose = require('mongoose');

const accountsSchema = new mongoose.Schema(
  {
    email:{
      type:String,
      required:true,
    },
    password:{
      type:String,
      required:true,
    },
    list:{
      type:Array,
      required:true,
    },
  },
  {
    collection:'accounts'
  }
);

module.exports = mongoose.model('Accounts',accountsSchema);

