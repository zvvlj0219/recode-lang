const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

//API routes
const dashboard = require('./routes/api/v1/dashboard');
const todo = require('./routes/api/v1/todo');
const timer = require('./routes/api/v1/timer');
app.use('/api/v1/dashboard',dashboard);
app.use('/api/v1/todo',todo);
app.use('/api/v1/timer',timer);

//handle production
if(process.env.NODE_ENV === 'produnction'){
  //static folder
  app.use(express.static(__dirname + '/public'));
  
  //handle spa
  app.get(/.*/,(req,res)=>res.sendFile(__dirname + 'public/index.html'));
}

// server 
const port = process.env.PORT || 5000;
app.listen(port,()=>{
  console.log('server is active port 5000')
})
