const get = (req,res)=>{
  const obj = {"balance":888}

  setTimeout(() => {    
    return res.json(obj); 
    // return res.json({}); //Empty data
    // return res.sendStatus(400); //Failure
  }, 10000);
}
module.exports = {get}