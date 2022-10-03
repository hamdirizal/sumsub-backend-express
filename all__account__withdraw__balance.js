const all__account__withdraw__balance = (req,res)=>{
  let obj = {balance: 2000,available_balance: 1500 }
  return res.json(obj);
}

module.exports = {all__account__withdraw__balance}