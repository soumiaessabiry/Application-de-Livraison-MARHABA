const express=require('express')
const app=express()
const db=require('./database/db')
const bodyParser=require('body-parser')

//*******importer dotenv*******//
const dotenv=require('dotenv')
dotenv.config()
const PORT=process.env.PORT || 8081

// medlwer
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//********importer les router*******//
const routeAuth=require('./routes/AuthRoute')
const User = require('./models/UserModel')

//******** middlwares pour register*******//
app.use('/api/auth',routeAuth)
// app.use('/',(req,res)=>{
//     res.send(user)
// })

//******** middlwares pour login*******//
// app.use('/api/auth')











app.listen(PORT,()=>{
    console.log(`serveur connect success in port ${PORT}`)
})

