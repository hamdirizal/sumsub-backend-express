const post = (req,res)=>{
  const obj = {success:true, message: "Mock: Verification code check success"}
  setTimeout(() => {    
    return res.json(obj); 
    // return res.json({}); //Empty data
    // return res.status(401).json({ "statusCode": 401, "message": "Mock: Verification code check failed", "error": "Unauthorized" });
  }, 2000);
}

module.exports = {post}


