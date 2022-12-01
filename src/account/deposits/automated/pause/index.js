const post = (req,res)=>{
  const obj = {success:true, message: "Automation paused"}
  setTimeout(() => {    
    return res.json(obj); 
  }, 500);
}

module.exports = {post}


