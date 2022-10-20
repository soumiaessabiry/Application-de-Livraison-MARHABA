const nodemailer = require("nodemailer");
const ls= require("local-storage");
const jwt=require('jsonwebtoken')
const User=require('./models/UserModel')

// async..await is not allowed in global scope, must use a wrapper
 function main() {

    const eml=ls('email')
    const tokSemail=jwt.sign({eml},process.env.TOKEN_SECRET)
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'testnodmtest@gmail.com', 
          pass: 'qmpjkxbtjjqpkkih', 
        },
      });
    
      let info = {
        from: '"soumia"<testnodmtest@gmail.com>', 
        to: eml,
        subject: "email verification ✔",  
        html: '<a class="btn btn-primary" href="http://localhost:8080/api/auth/confirm/'+tokSemail+'">verify</a>',
      };
      transporter.sendMail(info)
      console.log('sent')
}

// confirm email
async function confirm(req,res){
    const {token}=req.params
    const tkn=jwt.verify(token,process.env.TOKEN_SECRET)
    req.eml=tkn
   const updated=await User.findOneAndUpdate({email:req.eml.eml},{confirmed:true})
   if(!updated){
   return  res.send('not updated')
   }
   res.send('updated')

}
module.exports={main,confirm}
