const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//sample
router.get('/',(req,res)=>{
  res.send('todo')
})

module.exports = router;