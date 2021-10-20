const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
  //cookie 
  const token = req.cookies.access_data.token;
  if(!token){
    return res.status(401).send('Access Denied');
  }

  try{
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.account = verified;
    console.log('verifyed')
    next();
  }catch(err){
    res.status(400).send('Invalid Token')
  }
}