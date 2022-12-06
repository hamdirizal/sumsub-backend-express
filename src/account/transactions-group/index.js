const get = (req,res)=>{
  const obj = {
    "count": 20,
    "transactions": [
        {
            "id": 102,
            "amount": "5",
            "scheduled_on": null,
            "account_id": "JP5ByqDj3PFbqrW7kAZjhW9969bwBxi5aQnLM",
            "fee": "0",
            "type": "Withdrawal",
            "is_regular": "1",
            "asset_name": "USDC",
            "user_id": 685,
            "protocol": "aave-avax",
            "status_id": 1,
            "created_at": "2022-11-15T15:06:37.035Z",
            "pool_id": 274,
            "withdraw": [
                {
                    "id": 11,
                    "amount": "2.5",
                    "scheduled_on": null,
                    "asset_transfer_id": "Foobar",
                    "asset_transfer_method_id": "Foobar",
                    "status_id": 10,
                    "disbursable": "0.0001245",
                    "unit_count": "0.0001245",
                    "price_per_unit": "20080.3213",
                    "asset_name": "BTC",
                    "client": {},
                    "is_automat": true,
                    "settled_at": "2022-12-05T13:07:30.369Z",
                    "created_at": "2022-11-15T15:06:37.094Z",
                    "last_updated_at": "2022-12-05T13:07:30.369Z",
                    "completed_at": null,
                    "user_id": 685,
                    "product_id": 2,
                    "pool_id": 274,
                    "withdrawals_group_id": 3
                }
            ],
            "bank_account_mask": "1111",
            "bank_account_name": "Citibank Online",
            "frequency": "Quarterly",
            "next_iteration_date": "February 13, 2023",
            "status_name": "Active"
        }
    ]
}

  setTimeout(() => {    
    // return res.json({}); //Empty data
    return res.json(obj); 
    // return res.sendStatus(400); //Failure
  }, 100);
}

module.exports = {get}