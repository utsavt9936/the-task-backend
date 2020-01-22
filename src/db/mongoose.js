const mongoose=require('mongoose')
const validator=require('validator')




mongoose.connect(process.env.connectionUrl,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true})

// const User=mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,

    
//     },
//     email:{
//         type:String,
//         required:true,
//         lowercase:true,
//         validate(value) {
//             if(!validator.isEmail(value))
//             throw new Error('enter valid email')
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         validate(value) {
//             if(value==='password')
//             throw new Error('enter valid password')
//         }
//     }
// })

// const nw=new User({name:'aju',email:'abs@gmail.com',password:'password'})
// nw.save().then(()=>{
//     console.log(nw)
// }).catch((err)=>
// {
//     console.log(err)
// })