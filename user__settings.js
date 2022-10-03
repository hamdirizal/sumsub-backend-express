const user__settings = (req, res) => {
  let obj = {"id":18,"business_verification":0,"enable_2fa":false,"status_id":0,"deposit_status":0,"created_at":"2022-08-10T06:33:55.992Z"}
  return res.json(obj);
}
module.exports = {user__settings};