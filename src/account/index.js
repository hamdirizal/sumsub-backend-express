const get = (req,res)=>{
  let obj = [{"plaid_token_id":254,"poolId":null,"bank_name":"Citibank Online","accounts":[{"account_id":"5ZgyXBmAWZu9pnQBNrL6iLVVMVlXmxFpRG6DX","balances":{"available":100,"current":110,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":0},"mask":"0000","name":"Plaid Checking","official_name":"Plaid Gold Standard 0% Interest Checking","subtype":"checking","type":"depository"},{"account_id":"JP5ByqDj3PFbqrW7kAZjhW9969bwBxi5aQnLM","balances":{"available":200,"current":210,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":20},"mask":"1111","name":"Plaid Saving","official_name":"Plaid Silver Standard 0.1% Interest Saving","subtype":"savings","type":"depository"}]},{"plaid_token_id":268,"poolId":null,"bank_name":"Bank of America","accounts":[{"account_id":"g9zXjqodE8c3L8Wp6ooLfvRo5oDjPeC433qGE","balances":{"available":43200,"current":43200,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":4320},"mask":"4444","name":"Plaid Money Market","official_name":"Plaid Platinum Standard 1.85% Interest Money Market","subtype":"money market","type":"depository"}]},{"plaid_token_id":269,"poolId":null,"bank_name":"Wells Fargo","accounts":[{"account_id":"3jynKpnW3EIvWBKoE1mAiwN6XGWAyBHM4v8Bv","balances":{"available":null,"current":1000,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":0},"mask":"2222","name":"Plaid CD","official_name":"Plaid Bronze Standard 0.2% Interest CD","subtype":"cd","type":"depository"}]}];
  return res.json(obj);
}

module.exports = {get}