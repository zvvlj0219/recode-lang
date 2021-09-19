const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//tentative account email
const email = 'sample1234@mouse.com';

// mongoose connect to mongoDB Atlas
const uri = "mongodb+srv://zvvlj0219:se9108li07da13@cluster0.g2zyh.mongodb.net/recode_langDB?retryWrites=true&w=majority";

const options = {
	useUnifiedTopology : true,
	useNewUrlParser : true,
  useFindAndModify : false
}
mongoose.connect(uri,options);

//mongoose schema
const timerSchema = new mongoose.Schema(
  {
    email:String,
    language:String,
    created_at:String,
    study_time:Number,
    timestamps:Object
  },
  {
    collection:'record'
  }
);

//mongoose model
const Timer = mongoose.model('Timer',timerSchema);

//get time
router.get('/',async (req,res)=>{
  try{
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