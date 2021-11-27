const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
  try{
    //cookie 
    const token = req.cookies.access_data.token;
    if(!token){
      return res.status(401).send('Access Denied');
    }
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.account = verified;
    console.log('verifyed')
    console.log(`token : ${token.slice(0,10)}...`)
    next();
  }catch(err){
    res.status(400).send('Invalid Token')
  }
}