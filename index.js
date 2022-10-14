const express=require('express')
const app=express()
const db=require('./database/db')
const port=8081
//*******importer dotenv*******//

const dotenv=require('dotenv')
dotenv.config()
// medlwer
app.use(express.json())
app.use(express.urlencoded())

//********importer les router*******//
const routeAuth=require('./routes/AuthRoute')

//******** middlwares pour register*******//
app.use('/api/auth',routeAuth)

//******** middlwares pour login*******//
// app.use('/api/auth')






















app.listen(port,()=>{
    console.log(`serveur connect success in port ${port}`)
})

