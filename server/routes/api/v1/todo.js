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
const todoSchema = new mongoose.Schema(
  {
    language:String,
    text:String,
    study_time:Number,
    timestamps:Object
  },
  {
    collection:'todo'
  }
)

//mongoose model
const Todo = mongoose.model('Todo',todoSchema);

//get posts
router.get('/',async (req,res)=>{
  try{
    const todo = await Todo.find({});
    res.send(todo)
    console.log(todo)
    
  }catch(e){
    res.status(500).send()
  }
});


//add posts
router.post('/',async (req,res)=>{
  try{
    const data = {
      language:req.body.language,
      text:req.body.text,
      study_time:1,    
      timestamps:new Date()
    }
    const newTodo = await Todo.create(data);
    await newTodo.save();
    res.status(201).send(newTodo);
    console.log(newTodo)
  }catch(e){
    res.status(400).send();
  }
});

//update
router.put('/:id',async (req,res)=>{
  try{
    const todo = await Todo.findByIdAndUpdate(
      //id
      req.params.id,
      //update
      {text:req.body.text}
    );
    if(!todo){
      return res.status(404).send();
    }
    res.send(todo);
  }catch(e){
    res.status(500).send();
  }

})

//delete posts
router.delete('/:id',async (req,res)=>{
  try{
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if(!todo){
      return res.status(404).send();
    }
    res.send(todo);
  }catch(e){
    res.status(500).send();
  }
})

module.exports = router;