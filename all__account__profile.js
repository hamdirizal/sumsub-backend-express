const all__account__profile = (req,res)=>{
  let obj = {"first_name":"Hamdi","last_name":"Rizal","phone":"+19706477017","email":"hamdirizal@gmail.com","is_authorized_signer":"Yes"}
  return res.json(obj);
}
module.exports = {all__account__profile}