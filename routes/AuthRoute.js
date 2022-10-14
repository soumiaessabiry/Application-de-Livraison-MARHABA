        //****importer app pour gere les router***/
const router=require('express').Router()
const Users=require('../models/UserModel')
//*************ajouter user base donner******************* */
// ajouter async utiliser lorsque on ne connais pas le temps d'execution exacte
router.post('/register',async(req,res)=>{
    const user=new Users({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        role:req.body.password

    });
    // userSave va executer lorque l'apple aavec await

    const userSave=await user.save();
    try{
        res.send(userSave)
    } catch (error) {
        res.status(403).send(error)
    }

    
})




















// router.post('/register',async(req,res)=>{
//     // res.send('Register')
//      const user=new Users({
//         username : req.body.username,
//         email : req.body.email,
//         password : req.body.password,
//         role:req.body.role


//     });
//     try{
//         const saveuser=await user.save()
//         res.send(saveuser)
//     }catch(err){
//         res.status(400).send(err)
//     }

// })




module.exports=router