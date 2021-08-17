const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//sample
router.get('/',(req,res)=>{
  res.send('timer')
})

module.exports = router;