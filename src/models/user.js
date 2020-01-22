const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,

    
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate(value) {
            if(!validator.isEmail(value))
            throw new Error('enter valid email')
        }
    },
    password:{
        type:String,
        required:true,
        validate(value) {
            if(value==='password')
            throw new Error('enter valid password')
        }
    },
    tokens:[{token:{
        type:String,
        required:true
    }}
        ],
        avatar:{
            type:Buffer
        }
})

userSchema.statics.findCred=async (email,password)=>{
    const user=await User.findOne({email})
    if(!email)
    throw new Error ('Unable to login')

    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch)
    throw new Error ('Unable to login')

return user
}
userSchema.methods.getAuthToken=async function (){

    const user=this

    const token=jwt.sign({_id:user._id.toString()},process.env.TOKEN_SECRET)
     user.tokens=user.tokens.concat({token})
     await user.save()
    return token

}
userSchema.pre('save',async function (next) {
    const user=this
    if(user.isModified('password'))
    user.password=await bcrypt.hash(user.password,8)
    console.log('updating...')
    next()
})
const User=mongoose.model('User',userSchema)
module.exports=User