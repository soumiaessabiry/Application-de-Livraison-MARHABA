const stoctoken=require('local-storage')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')

function verification(data){
  return (req,res,next)=>{
    if(stoctoken('token')){
        const tv=jwt.verify(stoctoken('token'),process.env.TOKEN_SECRET)
        if(tv){
            req.user=tv
            if(data.includes(req.user.checuserexit.role)){
                next()
            }else{
                res.send('Access Denied')
            }

    
        }else{
            res.send('Invaclid token')
        }
    
    }else{
        console.log("token not exist")
    }
  }
}

module.exports= {verification}
