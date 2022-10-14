const mongoose=require('mongoose')
const Schema=mongoose.Schema
//****schema crées une collection(table) sur db*****/
const  userSchema= new Schema({
    //****les colonnes***/
        username: {
            type:String,
            required:true,
            min:4,
        },
        email:{
            type:String,
            required:true,
            min:6,
            

        },
        password:{
            type:String,
            required:true,
            min:4,
        },
        role:{
            type:String,
            required:true,
            min:3,
            

        },
        date:{
            type:Date,
            default:Date.now
        }


});
module.exports=mongoose.model('User',userSchema)