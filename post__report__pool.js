const post__report__pool = (req,res)=>{
  const obj = [
    {
      "id": 33,
      "earning": "-424.09",
      "balance": "10",
      "date_utc": "2022-10-17T12:10:12.978Z",
      "date": "2022-10-17",
      "pool_id": 185
    },
    {
      "id": 37,
      "earning": "-430",
      "balance": "12",
      "date_utc": "2022-10-19T12:13:29.301Z",
      "date": "2022-10-19",
      "pool_id": 185
    },
    {
      "id": 38,
      "earning": "-450",
      "balance": "19",
      "date_utc": "2022-10-20T12:13:29.301Z",
      "date": "2022-10-20",
      "pool_id": 185
    },
    {
      "id": 38,
      "earning": "-440",
      "balance": "15",
      "date_utc": "2022-10-21T12:13:29.301Z",
      "date": "2022-10-21",
      "pool_id": 185
    }
  ];
  return res.json(obj);
}
module.exports = {post__report__pool}