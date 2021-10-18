const express = require('express');
const router = express.Router();

//verify token function
const verify = require('./verifyToken');

//mongoose schema todoSchema and accountsSchema
const Todo = require('../../../model/todoModel');
const Timer = require('../../../model/timerModel');

//logged in  account email
const email = process.env.LOGGEDIN_EMAIL;


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
router.get('/', verify, async (req,res)=>{
  try{
    console.log(email)
    const timer = await Timer.find(
      {
        email:email,
        timestamps:{
          $gte:zeroday,
          $lte:sixday
        }
      }
    )
    .select(['language','study_time','timestamps']);

    const todo = await Todo.find(
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