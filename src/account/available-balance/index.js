const get = (req,res)=>{
  const obj = {"balance":777}

  setTimeout(() => {    
    return res.json(obj); 
    // return res.json({}); //Empty data
    // return res.sendStatus(400); //Failure
  }, 1);
}
module.exports = {get}