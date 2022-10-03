const post__account__deposits = (req,res)=>{
  let obj = {success:true, message:"Mock data: The deposit is created."}
  return res.json(obj);
}
module.exports = {post__account__deposits}