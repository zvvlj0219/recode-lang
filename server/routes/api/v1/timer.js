const express = require('express');
const router = express.Router();

//verify token function
const verify = require('../../../middleware/verifyToken');

//mongoose schema
const Timer = require('../../../model/timerModel');

//get time
router.get('/', verify ,async (req,res)=>{
  console.log(req.cookies.access_data.email)
  try{
    const email = req.cookies.access_data.email;
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
  const email = req.cookies.access_data.email;
  const data = {
    email:email,
    language:req.body.language,
    created_at:'timer',
    study_time:req.body.study_time,
    timestamps:new Date()
  }
  try{
    const newTimer = Timer.create(data).then(()=>console.log('await')).catch(error=>{
      console.log('catch')
      console.log(error)
    });
    res.status(201).send(newTimer);
  }catch(e){
    console.log('trycatch');
    console.log(e);
    res.status(400).send();
  }
});

module.exports = router;