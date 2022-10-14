            
            //*****************connexion db********************/
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true}).then(()=>{
    console.log("connexion with database  is successfly ")
}).catch(()=>{
    console.log('unable connect with database')
})


