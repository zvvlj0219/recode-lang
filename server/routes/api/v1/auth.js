const express = require('express');
const router = express.Router();
const Accounts = require('../../../model/accountsModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const {registerValidation, loginValidation} = require('../../../middleware/validation');
const initialLang = 'JavaScript'

//register
router.post('/register',async (req,res)=>{
  //validate the date
  const {error} = registerValidation(req.body);
  if(error){
    return res.status(400).send(error.details[0].message);
  }
  
  //checking if the user is already in the database
  const emailExist = await Accounts.findOne({email:req.body.email});
  if(emailExist){
    return res.status(400).send('Email already exists');
  }
  
  
  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  //create a new user
  const account = new Accounts({
    email:req.body.email,
    username:req.body.username,
    password:hashedPassword,
    list:[{language:initialLang}]
  });

  try{
    const createdAccount = await Accounts.create(account);
    await createdAccount.save();
    res.status(200).send(createdAccount);
  }catch(err){
    res.status(400).send(err);
  }
});

//login
router.post('/login', async (req,res)=>{
  //validate the data 
  const {error} = loginValidation(req.body);
  if(error){
    return res.status(400).send(error.details[0].message);
  };
  
  //checking if the email exists
  const account = await Accounts.findOne({email:req.body.email});
  if(!account){
    res.status(400).send('Email is not found');
  }
  
  //password is correct
  const validPass = await bcrypt.compare(req.body.password, account.password);
  if(!validPass){
    return res.status(400).send('Invalid Password');
  }
  
  //create and assign a token 2h
  const token = jwt.sign(
    {_id:account._id}, 
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256',expiresIn: '2h' }
  );
  
  //data token and email
  const data = {
    token:token,
    email:account.email
  }

  //set token on cookie
  res.cookie(
    "access_data", 
    data,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    }
  )
  .status(200)
  .json(data);
});

router.get('/logout', async (req,res)=>{
  console.log('get logout')
  res.clearCookie("access_data").send({mesage:'successfully logged out'})
});


module.exports = router;