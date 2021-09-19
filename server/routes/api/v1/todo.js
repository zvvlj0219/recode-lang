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


//mongoose schema todoSchema
const todoSchema = new mongoose.Schema(
  {
    email:String,
    language:String,
    created_at:String,
    text:String,
    checked:Boolean,
    study_time:Number,
    timestamps:Object
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
router.get('/',async (req,res)=>{
  try{
    const res1 = await Accounts.find({
      email:email
    })
    .select(['list']);
    res.send(...res1)
  }catch(e){
    res.status(500).send()
  }
})

//get todo routes
router.get('/:lang',async (req,res)=>{
  const res2 = await Todo.find({
    email:email,
    language:req.params.lang,
    created_at:'todo',
  })
  .select(['text','checked']);
  res.send(res2)
})

//add 
router.post('/',async (req,res)=>{
  try{
    const data = {
      email:email,
      language:req.body.language,
      created_at:'todo',
      text:req.body.text,
      checked:false,
      study_time:1,    
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
})

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