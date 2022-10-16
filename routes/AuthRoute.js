        //****importer app pour gere les router***/
const router=require('express').Router()
const Users=require('../models/UserModel')
const bcrypt = require("bcrypt")
// const {registerValidation}=require('../validation');
//*************ajouter user base donner******************* */

router.post('/register',async(req,res)=>{
    // res.json(registerValidation(req.body));
    // chec email is aredy exxict
    const checUser=await Users.findOne({
        email: req.body.email
    });
    if(checUser){
        return res.send('email daja existe')
    }
    // hach password 
    const salt= await bcrypt.genSalt(10)
    // console.log('salt:',salt)
    let passn=req.body.password.toString();
    const hachpassword=await bcrypt.hash(passn,salt);
    // add user
    const user=new Users({
        username:req.body.username,
        email:req.body.email,
        password:hachpassword,
        role:req.body.role

    });
    // userSave va executer lorque l'apple aavec await

    const userSave=await user.save();
    try{
        res.send(userSave)
    } catch (error) {
        res.status(403).send(error)
    }

    
})
























module.exports=router