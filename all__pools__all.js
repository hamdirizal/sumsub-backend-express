const all__pools__all = (req,res)=>{
  const obj = [{"id":999,"pool_name":"Hamdi Cool","pool_description":null,"pool_template_id":0,"created_at":"2022-10-19T04:15:24.308Z","balance":0,"deposit_status":0,"status_id":"1","automated_transfer":0,"apy":0},{"id":226,"pool_name":"Hamdi Cool 2","pool_description":null,"pool_template_id":0,"created_at":"2022-10-19T04:20:31.623Z","balance":0,"deposit_status":0,"status_id":"1","automated_transfer":0,"apy":0},{"id":227,"pool_name":"Hamdi Cool 3","pool_description":null,"pool_template_id":0,"created_at":"2022-10-19T04:27:51.098Z","balance":0,"deposit_status":0,"status_id":"1","automated_transfer":0,"apy":0},{"id":188,"pool_name":"PADC Pool","pool_description":null,"pool_template_id":0,"created_at":"2022-10-06T05:30:42.747Z","balance":0,"deposit_status":0,"status_id":"1","automated_transfer":0,"apy":0},{"id":185,"pool_name":"Qnarik jan","pool_description":"Cool Pool","pool_template_id":0,"created_at":"2022-10-05T08:58:28.274Z","balance":37.992138,"deposit_status":1,"status_id":"1","automated_transfer":3,"apy":0},{"id":176,"pool_name":"Tax witholding Test","pool_description":"Quarterly or yearly it doesn’t matter. Earn money inbetween tax period with your idle tax money.","pool_template_id":0,"created_at":"2022-09-28T08:08:40.484Z","balance":19.901589,"deposit_status":1,"status_id":"1","automated_transfer":5,"apy":0},{"id":206,"pool_name":"Test Pool","pool_description":"Test","pool_template_id":0,"created_at":"2022-10-14T15:06:23.693Z","balance":0,"deposit_status":0,"status_id":"1","automated_transfer":0,"apy":0}]
  setTimeout(() => {
    return res.json(obj);
    // return res.sendStatus(400)
  }, 1000);
}
module.exports = {all__pools__all}