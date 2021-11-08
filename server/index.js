const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();

//load .env
const dotenv = require('dotenv');
dotenv.config();

//import routes
const dashboardRoute = require('./routes/api/v1/dashboard');
const todoRoute = require('./routes/api/v1/todo');
const timerRoute = require('./routes/api/v1/timer');
const authRoute = require('./routes/api/v1/auth');

//connect to mongodb atlas
const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useFindAndModify : false,
  },
  ()=>{
    console.log('connected to mongodb atlas');
  }
);

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

//routes middleware
app.use('/api/v1/dashboard',dashboardRoute);
app.use('/api/v1/todo',todoRoute);
app.use('/api/v1/timer',timerRoute);
app.use('/api/v1/account',authRoute);
app.use('/api/v1/account',authRoute);


//handle production
if(process.env.NODE_ENV === 'production'){
  console.log(process.env.NODE_ENV)
  //static folder
  app.use(express.static(__dirname + '/public/'));
  //handle spa
  app.get('/',  (req,res)=>{
    // res.sendFile(__dirname + '/public/index.html');
    res.sendFile('./public/index.html');
  });
}

// server 
const port = process.env.PORT || 5000;
app.listen(port,()=>{
  console.log(`server is active port ${port}`);
});
