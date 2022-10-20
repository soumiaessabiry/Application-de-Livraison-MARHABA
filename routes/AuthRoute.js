const router=require('express').Router()
const Users=require('../models/UserModel')
const bcrypt = require("bcrypt")
var jwt=require("jsonwebtoken");
const tokenver=require('./TokenVerifier')
const ls=require('local-storage')
const nm=require('nodemailer')
const a=require('../nodmoler');

/**********************************************************************************************************/
router.post('/register',async(req,res)=>{
    ls('email',req.body.email)
    const checUser=await Users.findOne({
        email: req.body.email
    });
    if(checUser){
        return res.send('email daja existe')
    }
    //******hach password 
    const salt= await bcrypt.genSalt(10)
    let passtostr=req.body.password.toString();
    let  hachpassword=await bcrypt.hash(passtostr,salt);
    //*****recuperer data

    const user=new Users({
        username:req.body.username,
        email:req.body.email,
        password:hachpassword,
        role:req.body.role,
     });

    
    //**saveuser**/
    const userSave=await user.save();
        try{
            a.main()
            res.send(userSave)
           
        } catch (error) {
            res.status(403).send(error)
        }
    });
//*******login************/

router.post('/login', async(req,res)=>{
    let emailLogin=req.body.email;
    let passwordlog=req.body.password.toString();
    let confirmid=true

    

    const checuserexit=await Users.findOne({email:emailLogin,confirmed:confirmid});
    if (checuserexit) {
        const comparpwd=await bcrypt.compare(passwordlog,checuserexit.password)
        if(!comparpwd){
            res.send('password incorrect')
        }else{
            const tokene=jwt.sign({checuserexit},process.env.TOKEN_SECRET);
        
            res.send('User existe')
        }
    }else{
        res.send("veuillez verifier your mail!!")
    }
    //***Creeat token */
   

})
    router.get('/Client',tokenver.verification(["client"]),(req,res)=>{
      res.send('helloo clinet')
    })
    router.get('/Livreur',tokenver.verification(["livreur"]),(req,res)=>{
     res.send('hello livreur')
    })
    router.get('/Admin',tokenver.verification(["admin"]),(req,res)=>{
     res.send('binevenu admin')
    })
    router.get('/confirm/:token',a.confirm)






















module.exports=router