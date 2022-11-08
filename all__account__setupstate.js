const all__account__setupstate = (req,res)=>{
  //Sumsub states: init, completed, pending
  //PrimeTrust states: null, pending, opened
  let obj = {"business_verification":"NONE","submit_documentation":0,"deposit_status":0,"connect_accounts":false,"details":[], sumsub_state: 'completed', pt_state: 'pending'}
  // let obj = {"business_verification":"NONE","submit_documentation":0,"deposit_status":0,"details":[],"connect_accounts":false}
  return res.json(obj);
}
module.exports = {all__account__setupstate}