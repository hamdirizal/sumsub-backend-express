const get = (req,res)=>{
  const obj = {"count":3,"transactions":[{"id": 43, "amount": "2", "scheduled_on": null, "account_id": "JP5ByqDj3PFbqrW7kAZjhW9969bwBxi5aQnLM", "fee": "0", "type": 0, "asset_name": "USDC", "user_id": 685, "protocol": "aave-avax","pool_name":"My Test Pool 1", "status_id": 3, "created_at": "2022-11-15T16:47:11.828Z", "pool_id": 274, "amount_frequency": {"id": 43, "amount": "2", "amount_type": 0, "frequency": 2, "start_date": null, "created_at": "2022-11-15T16:47:11.828Z"}, "withdraw": [{"is_automat": true, "id": 527, "amount": "1", "scheduled_on": null, "account_id": "JP5ByqDj3PFbqrW7kAZjhW9969bwBxi5aQnLM", "tx_hash": null, "contribution_id": null, "asset_transfer_id": null, "asset_transfer_method_id": "0d70eadb-d988-4daa-84cc-b704bc11a60e", "quote_id": null, "disbursement_id": null, "authorization_disbursement_id": null, "internal_asset_transfer_id": null, "status_id": 7, "disbursable": null, "job_id": "845093aa-f1ad-401e-8e51-39106da03098", "unit_count": null, "price_per_unit": null, "asset_name": "usdc", "user_id": 685, "address": "0x0E5378358f07fc64d60f6002bdC2CF9BD4F5D867", "settled_at": null, "created_at": "2022-11-15T16:47:11.854Z", "completed_at": null, "product_id": 3, "pool_id": 274, "withdrawals_group_id": 3, "status_name": "Reversed"}, {"is_automat": true, "id": 528, "amount": "1", "scheduled_on": null, "account_id": "JP5ByqDj3PFbqrW7kAZjhW9969bwBxi5aQnLM", "tx_hash": null, "contribution_id": null, "asset_transfer_id": null, "asset_transfer_method_id": "9edffdc4-ee21-4a5a-865f-167371faae94", "quote_id": null, "disbursement_id": null, "authorization_disbursement_id": null, "internal_asset_transfer_id": null, "status_id": 7, "disbursable": null, "job_id": "0482aaeb-381d-43fe-9d57-d86f05fbceb6", "unit_count": null, "price_per_unit": null, "asset_name": "usdc", "user_id": 685, "address": "0xFe11193BDbB1AF9E44F440F32a29161a346B6375", "settled_at": null, "created_at": "2022-11-15T16:47:11.861Z", "completed_at": null, "product_id": 2, "pool_id": 274, "withdrawals_group_id": 3, "status_name": "Reversed"} ], "status_name": "Paused", "bank_account_mask": "1111", "bank_account_name": "Citibank Online", "frequency": "Monthly", "next_iteration_date": null },{"id":102,"amount":"5","scheduled_on":null,"account_id":"JP5ByqDj3PFbqrW7kAZjhW9969bwBxi5aQnLM","fee":"0","type":0,"asset_name":"USDC","user_id":685,"protocol":"aave-avax","pool_name":"My Test Pool 2","status_id":1,"created_at":"2022-11-15T15:06:37.035Z","pool_id":274,"deposit":[{"id":1028,"amount":"2.5","scheduled_on":null,"account_id":"JP5ByqDj3PFbqrW7kAZjhW9969bwBxi5aQnLM","fee":"0","contribution_id":"04715544-2673-409a-ab58-32676f7b678d","funds_transfer_id":"111a287c-ab43-48a3-ab23-19d73556383c","funds_transfer_method_id":"10f51ca3-fb3f-4448-a79c-ced0a1de32c5","quote_id":"eab3fcd3-b709-4b8d-8e04-9917f0167d79","asset_disbursement_id":"29864c62-6416-4919-a40e-2744828bb154","account_cash_transfer_id":"cf6bc0da-cdbc-46fe-91be-4b8d4e0749b1","asset_authorization_disbursement_id":"c5fb22bf-b298-4df2-b11f-adda95826988","status_id":10,"type":0,"job_id":null,"disbursable":"0.0001245","unit_count":"0.0001245","price_per_unit":"20080.3213","asset_name":"BTC","user_id":685,"settled_at":null,"is_wire":false,"is_confirmed":true,"created_at":"2022-11-15T15:06:37.094Z","completed_at":null,"product_id":2,"pool_id":274,"deposits_group_id":3,"transfer_url":null,"test_send_job_id":null,"status_name":"Wait To Confirm"},{"id":1029,"amount":"2.5","scheduled_on":null,"account_id":"JP5ByqDj3PFbqrW7kAZjhW9969bwBxi5aQnLM","fee":"0","contribution_id":"c695e346-7186-4f9f-aba2-cd58b7c32e43","funds_transfer_id":"5c606607-b4a5-4b15-b0be-c277e112ea8d","funds_transfer_method_id":"cab4dfc0-cff5-4456-9716-e705c1591882","quote_id":"d46a7354-de66-4ef6-9c10-87317b7433d0","asset_disbursement_id":"3e13ce56-3370-449c-9df1-bb6caad4be11","account_cash_transfer_id":"6827e26f-a37f-419b-9d3f-a87b101df495","asset_authorization_disbursement_id":"83eb1b41-176b-47db-9e4c-ef9c90da2e8c","status_id":10,"type":0,"job_id":null,"disbursable":"0.0001245","unit_count":"0.0001245","price_per_unit":"20080.3213","asset_name":"BTC","user_id":685,"settled_at":null,"is_wire":false,"is_confirmed":true,"created_at":"2022-11-15T15:06:37.103Z","completed_at":null,"product_id":3,"pool_id":274,"deposits_group_id":3,"transfer_url":null,"test_send_job_id":null,"status_name":"Wait To Confirm"}],"amount_frequency":{"id":111,"amount":"5","amount_type":0,"frequency":3,"start_date":null,"created_at":"2022-11-15T15:06:37.035Z"},"bank_account_mask":"1111","bank_account_name":"Citibank Online","frequency":"Quarterly","next_iteration_date":"February 13, 2023","status_name":"Active"},{"id":103,"amount":"1","scheduled_on":null,"account_id":"JP5ByqDj3PFbqrW7kAZjhW9969bwBxi5aQnLM","fee":"0","type":0,"asset_name":"USDC","user_id":685,"protocol":"aave-avax","pool_name":"My Test Pool 3","status_id":1,"created_at":"2022-11-15T16:45:27.946Z","pool_id":274,"deposit":[{"id":1030,"amount":"0.5","scheduled_on":"2022-11-30T16:44:46.853Z","account_id":"JP5ByqDj3PFbqrW7kAZjhW9969bwBxi5aQnLM","fee":"0","contribution_id":null,"funds_transfer_id":null,"funds_transfer_method_id":null,"quote_id":null,"asset_disbursement_id":null,"account_cash_transfer_id":null,"asset_authorization_disbursement_id":null,"status_id":0,"type":0,"job_id":null,"disbursable":null,"unit_count":null,"price_per_unit":null,"asset_name":"usdc","user_id":685,"settled_at":null,"is_wire":false,"is_confirmed":true,"created_at":"2022-11-15T16:45:28.001Z","completed_at":null,"product_id":2,"pool_id":274,"deposits_group_id":4,"transfer_url":null,"test_send_job_id":null,"status_name":"Pending"},{"id":1031,"amount":"0.5","scheduled_on":"2022-11-30T16:44:46.853Z","account_id":"JP5ByqDj3PFbqrW7kAZjhW9969bwBxi5aQnLM","fee":"0","contribution_id":null,"funds_transfer_id":null,"funds_transfer_method_id":null,"quote_id":null,"asset_disbursement_id":null,"account_cash_transfer_id":null,"asset_authorization_disbursement_id":null,"status_id":0,"type":0,"job_id":null,"disbursable":null,"unit_count":null,"price_per_unit":null,"asset_name":"usdc","user_id":685,"settled_at":null,"is_wire":false,"is_confirmed":true,"created_at":"2022-11-15T16:45:28.014Z","completed_at":null,"product_id":3,"pool_id":274,"deposits_group_id":4,"transfer_url":null,"test_send_job_id":null,"status_name":"Pending"}],"amount_frequency":{"id":112,"amount":"1","amount_type":0,"frequency":2,"start_date":"2022-11-30T16:44:46.853Z","created_at":"2022-11-15T16:45:27.946Z"},"bank_account_mask":"1111","bank_account_name":"Citibank Online","frequency":"Monthly","next_iteration_date":"December 15, 2022","status_name":"Active"}]}

  setTimeout(() => {    
    // return res.json({}); //Empty data
    return res.json(obj); 
    // return res.sendStatus(400); //Failure
  }, 100);
}
module.exports = {get}