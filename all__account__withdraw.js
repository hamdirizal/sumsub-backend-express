const all__account__withdraw = (req,res)=>{
  let obj = {success:true, id:1, amount: 300, scheduled_on: "2022-12-12 00:00:00", asset_transfer_id: '', status_id: 0, disbursable: 0, unit_count: 0, price_per_unit: 0, asset_name: 'USDC', client: 0, is_automat: false, protocol: 0, address: '', settled_at: "2022-12-12 00:00:00", created_at: "2022-12-12 00:00:00", completed_at: "2022-12-12 00:00:00", }
  return res.json(obj);
}
module.exports = {all__account__withdraw}