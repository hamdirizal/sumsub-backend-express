const get = (req,res)=>{
  const obj = {
    "available_balance": 99,
    "contingent-hold": 0,
    "non-contingent-hold": 0,
    "currency-type": "string",
    "disbursable": 0,
    "pending-transfer": 0,
    "settled": 0,
    "updated-at": "2022-12-01T13:13:36.971Z"
  }

  return res.json(obj); 
}

module.exports = {get}