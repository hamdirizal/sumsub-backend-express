const post = (req,res)=>{
  const obj = {success:true, message: "Action success."}
  setTimeout(() => {    
    return res.json(obj); 
    // return res.json({}); //Empty data
    // return res.sendStatus(400); //Failure
  }, 100);
}

module.exports = {post}


