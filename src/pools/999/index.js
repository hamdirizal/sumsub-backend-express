//Creating pool
const get = (req,res)=>{
  let obj = {"id":999,"pool_name":"Hamdi's Third Pool","pool_description":"test description","pool_template_id":0,"created_at":"2022-11-15T06:50:21.997Z","balance":0,"deposit_status":1,"status_id":"1","automated_transfer":0,"apy":0}
  return res.json(obj);
}
module.exports = {get}

