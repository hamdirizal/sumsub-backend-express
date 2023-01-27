const all__account__deposits__products = (req, res)=>{
  let obj = [
    {"id":5,"product_name":"Maple","asset_name":"usdc","network":"Ethereum","locking_period":null,"protocol":"maple","yield":"2.73","type":0,"status_id":1,"image_url":"https://poplar-assets.s3.amazonaws.com/products/Maple+(MPL)+Crypto+Logo+1.svg","asset_id":"798debbc-ec84-43ea-8096-13e2ebcf4749","created_at":"2022-10-30T15:46:55.322Z","type_name":"Fiat Backed"},
    {"id":3,"product_name":"Compound","asset_name":"usdc","network":"Ethereum","locking_period":null,"protocol":"compound","yield":"6.08","type":0,"status_id":1,"image_url":"https://poplar-assets.s3.amazonaws.com/products/Compound.svg","asset_id":"798debbc-ec84-43ea-8096-13e2ebcf4749","created_at":"2022-08-17T20:53:56.466Z","type_name":"Fiat Backed"},
    {"id":4,"product_name":"Alkemi","asset_name":"usdc","network":"Ethereum","locking_period":null,"protocol":"alkemi","yield":"4.22","type":0,"status_id":1,"image_url":"https://poplar-assets.s3.amazonaws.com/products/Alkemi.svg","asset_id":"798debbc-ec84-43ea-8096-13e2ebcf4749","created_at":"2022-08-17T20:53:56.466Z","type_name":"Fiat Backed"},
    {"id":999,"product_name":"Goldfinch","asset_name":"usdc","network":"Ethereum","locking_period":"20 days","protocol":"goldfinch","yield":"7.22","type":0,"status_id":1,"image_url":"https://poplar-assets.s3.amazonaws.com/products/Alkemi.svg","asset_id":"798debbc-ec84-43ea-8096-1111111","created_at":"2022-08-17T20:53:56.466Z","type_name":"Fiat Backed"}];
  return res.json(obj);
  // return res.json([])
}
module.exports = {all__account__deposits__products}