const get = (req,res)=>{
  let obj = {"start_date_balance_am":11.5,"end_date_balance_am":11.5,"total_earnings_am":-16.99};
  return res.json(obj);
}

module.exports = {get}