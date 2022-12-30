const all__account__agreementpreviews = (req,res)=>{
  let obj = {content:'<div style="border:1px solid black;padding:2em;max-width:700px;margin:0 auto;"><h1>Privacy policy html returned from the api.</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>'}
  return res.json(obj);
}
module.exports = {all__account__agreementpreviews}
