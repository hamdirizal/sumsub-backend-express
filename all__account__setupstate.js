const all__account__setupstate = (req,res)=>{
  let obj = {
    "business_verification":"VERIFIED",
    "connect_accounts":false,
    "submit_documentation":0,"details":[],"sumsub_state":"completed","pt_state":"opened","deposit_status":1
  }
  return res.json(obj);
}
module.exports = {all__account__setupstate}













  //Sumsub states: init, completed, pending
  //PrimeTrust states: null, pending, opened
  // let obj = {"business_verification":"NONE","submit_documentation":0,"deposit_status":0,"connect_accounts":true,"details":[], sumsub_state: 'completed', pt_state: 'opened'}
  // let obj = {"business_verification":"NONE","submit_documentation":0,"deposit_status":0,"details":[],"connect_accounts":false}