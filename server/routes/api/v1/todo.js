const express = require('express');
const router = express.Router();

//verify token function
const verify = require('./verifyToken');

//mongoose schema todoSchema and accountsSchema
const Todo = require('../../../model/todoModel');
const Accounts = require('../../../model/accountsModel');
  
//get todo
router.get('/', verify , async (req,res)=>{
  try{
    console.log(req.cookies.access_data.email)
    const email = req.cookies.access_data.email;
    const list = await Accounts.find(
      {
        email:email
      },
      {
        list:1,
        _id:0
      }
    ) .select(['list']);
   
    const todo = await Todo.find(
      {
        email:email,
        created_at:'todo',
        isDone:false
      }
    ).select(['language','text','checked']);

    res.send({
      list:list[0].list,
      todo:todo
    })
  }catch(e){
    res.status(500).send()
  }
})

//add todo
router.post('/',async (req,res)=>{
  try{
    const email = req.cookies.access_data.email;
    const data = {
      email:email,
      language:req.body.language,
      created_at:'todo',
      text:req.body.text,
      checked:false,
      study_time:1,  
      isDone:false,  
      timestamps:new Date()
    }
    const newTodo = await Todo.create(data);
    await newTodo.save();
    res.status(201).send(newTodo);
  }catch(e){
    res.status(400).send();
  }
});

//update checked
router.put('/checked',async (req,res)=>{
  try{
    const result = await Todo.findByIdAndUpdate(
      //id
      req.body.id,
      //update
      {checked:req.body.checked}
    );
    if(!result){
      return res.status(404).send();
    }
    res.send(result);
  }catch(e){
    res.status(500).send();
  }
});

//update tab lang
router.put('/list',async (req,res)=>{
  try{
    const email = req.cookies.access_data.email;
    const list = req.body.list;
    const data = await Accounts.findOneAndUpdate(
      {
        email:email
      },
      {
        $set:{
          list:list
        }
      }
      );
      if(!data){
      return res.status(404).send();
    }
    res.send(data);
  }catch(e){
    res.status(500).send();
  }
});

//update isDone
router.put('/isDone', async (req,res)=>{
  try{
    const id = req.body.id;
    id.forEach(async el=>{
      await Todo.findByIdAndUpdate(
        {
          _id:el
        },
        {
          $set:{
            isDone:true
          }
        }
      );
    })
    res.send()
  }catch(e){
    res.status(500).send();
  }
})

//delete by id or many
router.delete('/',async (req,res)=>{
  const id = req.body.id;
  const lang = req.body.language;

  if(id === null){
    try{
      const result = await Todo.deleteMany({
        language:req.body.language,
        created_at:'todo'
      });
      res.send(result);
    }catch(e){
      res.status(500).send();
    }
  }
  
  if(lang === null){
    try{
      const result = await Todo.findByIdAndDelete(req.body.id);
      res.send(result);
    }catch(e){
      res.status(500).send();
    }
  }
});

module.exports = router;