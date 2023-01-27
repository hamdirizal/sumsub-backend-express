const all__account__deposits__automat = (req,res)=>{
  let obj = {
    "pool_id": 355,
    "success": true,
    "message": "Mock data: The deposit is created."
  }
  return res.json(obj);
}

module.exports = {all__account__deposits__automat}
