const all__account__deposits__automat = (req,res)=>{
  let obj = { success: true, message: 'Mock data: The automated deposit is created' };
  return res.json(obj);
}

module.exports = {all__account__deposits__automat}
