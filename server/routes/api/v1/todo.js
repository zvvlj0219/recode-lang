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


//mongoose schema todoSchema
const todoSchema = new mongoose.Schema(
  {
    email:String,
    language:String,
    created_at:String,
    text:String,
    checked:Boolean,
    study_time:Number,
    isDone:Boolean,
    timestamps:Object,
  },
  {
    collection:'record'
  }
);

//mongoose schema accountSchema
const accountsSchema = new mongoose.Schema(
  {
    email:String,
    password:String,
    list:Array
  },
  {
    collection:'accounts'
  }
);

//mongoose model
const Todo = mongoose.model('Todo',todoSchema);
const Accounts = mongoose.model('Accounts',accountsSchema);

//get todo
router.get('/', async (req,res)=>{
  try{
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
router.put('/:id',async (req,res)=>{
  try{
    const result = await Todo.findByIdAndUpdate(
      //id
      req.params.id,
      //update
      {checked:req.body.checked}
    );
    if(!result){
      return res.status(404).send();
    }
    console.log('from :id isDone')
    res.send(result);
  }catch(e){
    res.status(500).send();
  }
});

//update tab lang
router.put('/',async (req,res)=>{
  try{
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


//delete by id or many
router.delete('/',async (req,res)=>{
  const id = req.body.id;
  const lang = req.body.language;

  if(id === null){
    try{
      console.log(lang)
      const result = await Todo.deleteMany({
        language:req.body.language,
        created_at:'todo'
      });
      if(!result){
        return res.status(404).send();
      }
      res.send(result);
    }catch(e){
      console.log('error')
    }
  }
  
  if(lang === null){
    try{
      console.log(id);
      const result = await Todo.findByIdAndDelete(req.body.id);
      if(!result){
        return res.status(404).send();
      }
      res.send(result);
    }catch(e){
      console.log('error')
    }
  }
});

module.exports = router;