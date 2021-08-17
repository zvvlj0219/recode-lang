const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// mongoose connect to mongoDB Atlas
const uri = "mongodb+srv://zvvlj0219:se9108li07da13@cluster0.g2zyh.mongodb.net/test2?retryWrites=true&w=majority";

const options = {
	useUnifiedTopology : true,
	useNewUrlParser : true
}
mongoose.connect(uri,options);

//mongoose schema
const timerSchema = new mongoose.Schema(
  {
    language:String,
    study_time:Number,
    timestamps:Object
  },
  {
    collection:'timer'
  }
);

//mongoose model
const Timer = mongoose.model('Timer',timerSchema);

//get posts
router.get('/',async (req,res)=>{
  try{
    const time = await Timer.find().limit(5);
    res.send(time);
  }catch(e){
    res.status(500).send();
  }
});

//add posts
router.post('/',async (req,res)=>{
  try{
    const data = {
      language:req.body.language,
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