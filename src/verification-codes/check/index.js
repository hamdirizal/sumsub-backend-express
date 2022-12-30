const post = (req,res)=>{
  const obj = {success:true, message: "Mock: Verification code check success"}
  setTimeout(() => {    
    return res.json(obj); 
    // return res.json({}); //Empty data
    // return res.sendStatus(400); //Failure
  }, 3000);
}

module.exports = {post}


