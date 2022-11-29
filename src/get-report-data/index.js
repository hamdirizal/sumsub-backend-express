const get = (req,res)=>{
  const obj = {
    "start_date": "2022-05-01",
    "end_date": "2022-11-21",
    "company_name": "Saikat",
    "start_date_balance": 339880.03,
    "end_date_balance": 0,
    "total_earnings": 0,
    "generated_on": 5,
    "current_yield": 3,
    "current_risk": 9,
    "pools_included": ['My Pool', 'Your Pool', 'Another pOol'],
    "transactions": [
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Compound.svg",
        "product_product_name": "Compound",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "6.08",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Aave.svg",
        "product_product_name": "Aave",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "2.73",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Compound.svg",
        "product_product_name": "Compound",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "6.08",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Aave.svg",
        "product_product_name": "Aave",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "2.73",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Compound.svg",
        "product_product_name": "Compound",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "6.08",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Aave.svg",
        "product_product_name": "Aave",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "2.73",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Compound.svg",
        "product_product_name": "Compound",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "6.08",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Compound.svg",
        "product_product_name": "Compound",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "6.08",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Aave.svg",
        "product_product_name": "Aave",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "2.73",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Compound.svg",
        "product_product_name": "Compound",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "6.08",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Aave.svg",
        "product_product_name": "Aave",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "2.73",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Compound.svg",
        "product_product_name": "Compound",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "6.08",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Aave.svg",
        "product_product_name": "Aave",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "2.73",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Compound.svg",
        "product_product_name": "Compound",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "6.08",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Aave.svg",
        "product_product_name": "Aave",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "2.73",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Compound.svg",
        "product_product_name": "Compound",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "6.08",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Aave.svg",
        "product_product_name": "Aave",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "2.73",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Aave.svg",
        "product_product_name": "Aave",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "2.73",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Aave.svg",
        "product_product_name": "Aave",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "2.73",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Compound.svg",
        "product_product_name": "Compound",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "6.08",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Aave.svg",
        "product_product_name": "Aave",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "2.73",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Compound.svg",
        "product_product_name": "Compound",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "6.08",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Compound.svg",
        "product_product_name": "Compound",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "6.08",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Aave.svg",
        "product_product_name": "Aave",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "2.73",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Aave.svg",
        "product_product_name": "Aave",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "2.73",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Compound.svg",
        "product_product_name": "Compound",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "6.08",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Aave.svg",
        "product_product_name": "Aave",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "2.73",
        "pool_pool_name": "Payroll"
      },
      {
        "product_image_url": "https://poplar-assets.s3.amazonaws.com/products/Compound.svg",
        "product_product_name": "Compound",
        "type": "Deposit",
        "product_asset_name": "usdc",
        "product_network": "ethereum",
        "product_yield": "6.08",
        "pool_pool_name": "Payroll"
      }
    ]
  }
  return res.json(obj);
}
module.exports = {get}