const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//tentative account email
const email = 'sample1234@mouse.com';

// mongoose connect to mongoDB Atlas
const uri = "mongodb+srv://zvvlj0219:se9108li07da13@cluster0.g2zyh.mongodb.net/recode_langDB?retryWrites=true&w=majority";

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
    collection:'recode'
  }
);

//mongoose model
const Timer = mongoose.model('Timer',timerSchema);

//get posts
router.get('/',async (req,res)=>{
  try{
    //ここをtodo.jsを参考に修正、match project
    const time = await Timer.find().limit(3);
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
      created_at:'timer',
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