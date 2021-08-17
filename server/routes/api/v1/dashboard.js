const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//sample
router.get('/',(req,res)=>{
  res.send('dshboard')
})

module.exports = router;