const post__account__deposits = (req,res)=>{
  let obj = {success:true, message:"Mock data: The deposit is created."}
  setTimeout(() => {    
    return res.json(obj); 
    // return res.json({}); //Empty data
    // return res.status(401).json({ "statusCode": 401, "message": "Mock: Deposit failed", "error": "Error" });
  }, 2000);
}
module.exports = {post__account__deposits}