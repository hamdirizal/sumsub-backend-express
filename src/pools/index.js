//Creating pool
const post = (req,res)=>{
  let obj = {"message":"New poplar account has been added","success":true,"id":999};
  return res.json(obj);
}
module.exports = {post}

