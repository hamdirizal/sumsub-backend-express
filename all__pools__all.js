const all__pools__all = (req,res)=>{
  //Full ata
  const obj = [{"id":355,"pool_name":"Hamdi Cool","pool_description":null,"pool_template_id":0,"created_at":"2022-10-19T04:15:24.308Z","balance":100,"deposit_status":0,"status_id":"1","automated_transfer":0,"apy":3},{"id":356,"pool_name":"Hamdi Cool 2","pool_description":null,"pool_template_id":0,"created_at":"2022-10-19T04:20:31.623Z","balance":0,"deposit_status":0,"status_id":"1","automated_transfer":0,"apy":0},{"id":357,"pool_name":"Hamdi Cool 3","pool_description":null,"pool_template_id":0,"created_at":"2022-10-19T04:27:51.098Z","balance":25000,"deposit_status":0,"status_id":"1","automated_transfer":0,"apy":2}]

  //Empty data
  // const obj = [];

  setTimeout(()=>{
    return res.json(obj)
  },500);
  // return res.json({}); //Empty data
  // return res.sendStatus(400); //Failure
}
module.exports = {all__pools__all}