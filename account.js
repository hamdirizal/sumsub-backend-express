const account = (req,res)=>{
  // let obj = {"business_verification":"VERIFIED","submit_documentation":0,"deposit_status":0,"connect_accounts":true,"details":[]}
  let obj = [{"plaid_token_id":182,"poplar_account_id":null,"bank_name":"Chase","accounts":[{"account_id":"Jqz3N1dBloTx93BZXKrEIRGWXvwgkDuo3zv7e","balances":{"available":100,"current":110,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":0},"mask":"0000","name":"Plaid Checking","official_name":"Plaid Gold Standard 0% Interest Checking","subtype":"checking","type":"depository"},{"account_id":"k6aVQJXz9gtAqXpKzPxwFkP8mn6j7eCznMeP7","balances":{"available":200,"current":210,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":20},"mask":"1111","name":"Plaid Saving","official_name":"Plaid Silver Standard 0.1% Interest Saving","subtype":"savings","type":"depository"}]},{"plaid_token_id":183,"poplar_account_id":null,"bank_name":"Chase","accounts":[{"account_id":"4WGrZA4L1BIgJMV1ay6KCPJmXANNLztngD3Dw","balances":{"available":100,"current":110,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":10},"mask":"0000","name":"Plaid Checking","official_name":"Plaid Gold Standard 0% Interest Checking","subtype":"checking","type":"depository"},{"account_id":"NZgRPLdKJmi3gNQ9r8LJCld7XvAAR4fnre7em","balances":{"available":200,"current":210,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":20},"mask":"1111","name":"Plaid Saving","official_name":"Plaid Silver Standard 0.1% Interest Saving","subtype":"savings","type":"depository"}]},{"plaid_token_id":184,"poplar_account_id":null,"bank_name":"Chase","accounts":[{"account_id":"8KPRLZwxXqSerRjD5n8Zh8DmoG3onecK4VgPQ","balances":{"available":100,"current":110,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":10},"mask":"0000","name":"Plaid Checking","official_name":"Plaid Gold Standard 0% Interest Checking","subtype":"checking","type":"depository"},{"account_id":"EeWrx3NzXvCnGKd6MVmJhldpz9MzWwi9vPraZ","balances":{"available":200,"current":210,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":20},"mask":"1111","name":"Plaid Saving","official_name":"Plaid Silver Standard 0.1% Interest Saving","subtype":"savings","type":"depository"}]},{"plaid_token_id":187,"poplar_account_id":null,"bank_name":"Chase","accounts":[{"account_id":"Jj9DjwNL6acb1AxRX7n8s4DQqoVKqDfowxLy9","balances":{"available":100,"current":110,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":10},"mask":"0000","name":"Plaid Checking","official_name":"Plaid Gold Standard 0% Interest Checking","subtype":"checking","type":"depository"},{"account_id":"kNkWNMQEPbunLoAbzVJGH5e3LKJRLeUzAabje","balances":{"available":200,"current":210,"iso_currency_code":"USD","limit":null,"unofficial_currency_code":null,"idle_cash":20},"mask":"1111","name":"Plaid Saving","official_name":"Plaid Silver Standard 0.1% Interest Saving","subtype":"savings","type":"depository"}]}]
  return res.json(obj);
}

module.exports = {account}