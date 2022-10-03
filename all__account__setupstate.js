const all__account__setupstate = (req,res)=>{
  let obj = {"business_verification":"VERIFIED","submit_documentation":0,"deposit_status":1,"connect_accounts":true,"details":[]}
  // let obj = {"business_verification":"NONE","submit_documentation":0,"deposit_status":0,"details":[],"connect_accounts":false}
  return res.json(obj);
}
module.exports = {all__account__setupstate}