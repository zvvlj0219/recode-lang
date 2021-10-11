const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//tentative account email
const email = 'sample1234@mouse.com';

// mongoose connect to mongoDB Atlas
const uri = require('../../../config');

const options = {
	useUnifiedTopology : true,
	useNewUrlParser : true,
  useFindAndModify : false
}
mongoose.connect(uri,options);

//mongoose schema
const dashboardTodoSchema = new mongoose.Schema(
  {
    email:String,
    language:String,
    created_at:String,
    study_time:Number,
    timestamps:Object
  },
  {
    collection:'todo'
  }
);

const dashboardTimerSchema = new mongoose.Schema(
  {
    email:String,
    language:String,
    created_at:String,
    study_time:Number,
    timestamps:Object
  },
  {
    collection:'timer'
  }
);

//mongoose model
const DashboardTodo = mongoose.model('DashboardTodo',dashboardTodoSchema);
const DashboardTimer = mongoose.model('DashboardTimer',dashboardTimerSchema);

//zeroday sixday
let today = new Date();
let day = today.getDay();
let zeroday = new Date();
let sixday = new Date();
zeroday.setFullYear(today.getFullYear());
zeroday.setMonth(today.getMonth());
zeroday.setDate(today.getDate()-day);
zeroday.setHours(0);
zeroday.setMinutes(0);
zeroday.setSeconds(0);
sixday.setDate(zeroday.getDate()+6);

//get dashboard
router.get('/',async (req,res)=>{
  try{
    const timer = await DashboardTimer.find(
      {
        email:email,
        timestamps:{
          $gte:zeroday,
          $lte:sixday
        }
      }
    )
    .select(['language','study_time','timestamps']);

    const todo = await DashboardTodo.find(
      {
        email:email,
        timestamps:{
          $gte:zeroday,
          $lte:sixday
        },
        isDone:true
      }
    )
    .select(['language','study_time','timestamps']);

    console.log(timer)
    console.log(todo)
    res.send({
      timer:timer,
      todo:todo
    });
  }catch(e){
    res.status(500).send();
  }
});

module.exports = router;