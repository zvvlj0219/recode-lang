const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const history = require('connect-history-api-fallback');

//load .env
const dotenv = require('dotenv');
dotenv.config();

//connect to mongodb atlas
const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useUnifiedTopology : true,
    useNewUrlParser : true,
  },
).then(()=>{
    console.log('connect mongo response');
  }
).catch(err=>{
    console.log(err);
  }
);

//import routes
const dashboardRoute = require('./routes/api/v1/dashboard');
const todoRoute = require('./routes/api/v1/todo');
const timerRoute = require('./routes/api/v1/timer');
const authRoute = require('./routes/api/v1/auth');

//express
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());
//connect-history-api-fallback
const staticFileMiddleware = express.static(__dirname + '/public');
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);

//routes middleware
app.use('/api/v1/dashboard',dashboardRoute);
app.use('/api/v1/todo',todoRoute);
app.use('/api/v1/timer',timerRoute);
app.use('/api/v1/account',authRoute);
app.use('/api/v1/account',authRoute);


//handle production
if(process.env.NODE_ENV === 'production'){
  //static folder
  app.use(express.static(__dirname + '/public'));
  //handle spa
  app.get('/',  (req,res)=>{
    res.sendFile(__dirname + 'public/index.html');
  });
}

// server 
const port = process.env.PORT || 5000;
app.listen(port,()=>{
  console.log('NODE_ENV is '+ process.env.NODE_ENV)
  console.log(`server is active port ${port}`);
});
