const all__pools__templates = (req,res)=>{
  const obj = [{"id":0,"pool_template_name":"Tax witholding","pool_template_description":"Quarterly or yearly it doesn’t matter. Earn money inbetween tax period with your idle tax money.","pool_template_more_description":"Lorem Ipsum","pool_template_best_for":"Lorem Ipsum"},{"id":1,"pool_template_name":"Payroll","pool_template_description":"Earn money inbetween pay periods on the cash used to pay for your employees.","pool_template_more_description":"Lorem Ipsum","pool_template_best_for":"Lorem Ipsum"},{"id":2,"pool_template_name":"Inventory","pool_template_description":"Earn money on the idle cash you have waiting on an invetory order to supply your business.","pool_template_more_description":"Lorem Ipsum","pool_template_best_for":"Lorem Ipsum"}];
  setTimeout(() => {
    // return res.json(obj);
    return res.sendStatus(400)
  }, 1000);
}
module.exports = {all__pools__templates}