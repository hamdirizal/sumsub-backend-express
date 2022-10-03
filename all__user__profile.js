const all__user__profile = (req,res)=>{
  let obj = {"user_id":23,"first_name":"Hamdi","last_name":"Rizal","phone":"19706477017","email":"hamdirizal@gmail.com","auth0_user_id":"auth0|62f351030861016987eece88","company_name":"HamdiPoplarDevtTest","created_at":"2022-08-10T06:33:55.992Z","id":18,"business_verification":0,"enable_2fa":false,"status_id":0,"deposit_status":0}
  return res.json(obj);
}
module.exports = {all__user__profile}