const post = (req,res)=>{
  const obj = {success:1}
  setTimeout(() => {    
    return res.json(obj); 
    // return res.json({}); //Empty data
    // return res.sendStatus(400); //Failure
  }, 5000);
}
module.exports = {post}