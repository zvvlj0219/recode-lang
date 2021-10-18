const express = require('express');
const router = express.Router();

//verify token function
const verify = require('./verifyToken');

//mongoose schema
const Timer = require('../../../model/timerModel');

//logged in  account email
const email = process.env.LOGGEDIN_EMAIL;

//get time
router.get('/', verify ,async (req,res)=>{
  try{
    console.log(email)
    const time = await Timer.find(
      {created_at:'timer',email:email}
    )
    .sort({timestamps: -1})
    .select(['language','study_time','timestamps'])
    .limit(4);
    res.send(time)
  }catch(e){
    res.status(500).send();
  }
});

//add time
router.post('/',async (req,res)=>{
  try{
    const data = {
      email:email,
      language:req.body.language,
      created_at:'timer',
      study_time:req.body.study_time,
      timestamps:new Date()
    }
    const newTimer = await Timer.create(data);
    await newTimer.save();
    res.status(201).send(newTimer);
  }catch(e){
    res.status(400).send();
  }
});

module.exports = router;