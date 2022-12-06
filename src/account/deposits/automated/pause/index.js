const post = (req,res)=>{
  const obj = {success:true, message: "Automation paused"}
  setTimeout(() => {    
    return res.json(obj); 
  }, 100);
}

module.exports = {post}


