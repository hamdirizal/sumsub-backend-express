const get = (req,res)=>{
  let obj = {
    "count": "1000",
    "response": [
      {
        "id": 105, //BOOKMARK
        "amount": "1",
        "scheduled_on": null,
        "account_id": "JP5ByqDj3PFbqrW7kAZjhW9969bwBxi5aQnLM",
        "fee": "0",
        "type": 0,
        "asset_name": "USDC",
        "user_id": 685,
        "protocol": "aave-avax",
        "status_id": 1,
        "created_at": "2022-11-15T16:45:27.946Z",
        "pool_id": 274,
        "deposit": [
          {
            "id": 1030,
            "amount": "0.5",
            "scheduled_on": "2022-11-30T16:44:46.853Z",
            "fee": "0",
            "status_id": 0,
            "type": 0,
            "disbursable": null,
            "unit_count": null,
            "price_per_unit": null,
            "asset_name": "usdc",
            "user_id": 685,
            "settled_at": null,
            "is_wire": false,
            "is_confirmed": true,
            "created_at": "2022-11-15T16:45:28.001Z",
            "completed_at": null,
            "last_updated_at": null,
            "product_id": 2,
            "pool_id": 274,
            "deposits_group_id": 4,
            "transfer_url": null
          },
          {
            "id": 1031,
            "amount": "0.5",
            "scheduled_on": "2022-11-30T16:44:46.853Z",
            "fee": "0",
            "status_id": 0,
            "type": 0,
            "disbursable": null,
            "unit_count": null,
            "price_per_unit": null,
            "asset_name": "usdc",
            "user_id": 685,
            "settled_at": null,
            "is_wire": false,
            "is_confirmed": true,
            "created_at": "2022-11-15T16:45:28.014Z",
            "completed_at": null,
            "last_updated_at": null,
            "product_id": 3,
            "pool_id": 274,
            "deposits_group_id": 4,
            "transfer_url": null
          }
        ],
        "amount_frequency": {
          "id": 112,
          "amount": "1",
          "amount_type": 0,
          "frequency": 2,
          "start_date": "2022-11-30T16:44:46.853Z",
          "created_at": "2022-11-15T16:45:27.946Z"
        },
        "pool": {
          "id": 274,
          "pool_name": "Payroll",
          "pool_description": "Earn money inbetween pay periods on the cash used to pay for your employees.",
          "user_id": 685,
          "status_id": 1,
          "pool_template_id": 1,
          "created_at": "2022-11-03T19:35:32.085Z"
        },
        "frequency": "Monthly",
        "next_iteration_date": "2022-11-30T16:44:46.853Z",
        "mask": "1111",
        "account_name": "Plaid Silver Standard 0.1% Interest Saving"
      }
    ]
  }
  setTimeout(()=>{
    return res.json(obj)
  },2000);
}

module.exports = {get}


