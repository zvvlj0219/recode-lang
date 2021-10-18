const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();

//import routes
const dashboardRoute = require('./routes/api/v1/dashboard');
const todoRoute = require('./routes/api/v1/todo');
const timerRoute = require('./routes/api/v1/timer');

//load .env
dotenv.config();

//connect to mongodb atlas
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useFindAndModify : false
  },
  ()=>{
    console.log('connected to mongodb atlas')
  }
);

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//routes middleware
app.use('/api/v1/dashboard',dashboardRoute);
app.use('/api/v1/todo',todoRoute);
app.use('/api/v1/timer',timerRoute);

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
  console.log(`server is active port ${port}`);
})
