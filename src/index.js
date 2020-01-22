const express=require('express')
const mongoose=require('./db/mongoose')
const User=require('./models/user')
const Task=require('./models/task')
const jwt=require('jsonwebtoken')
const app=express()


const port=process.env.port||3000
app.use(express.json())

const multer=require('multer')
const upload=multer({
    
    fileFilter(req,file,cb){
        if(!file.originalname.endsWith('.jpg'))
        return cb(new Error('only jpg file'))
        else
        cb(undefined,true)
    }
})


app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
})



const auth=async (req,res,next)=>{
   
   
   
    try {
        console.log(req.body)
        const Authorization=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(Authorization,'mytoken')
        const user= await User.findOne({_id:decoded._id,'tokens.token':Authorization})
       // console.log(user,Authorization)
        req.token=Authorization
        req.user=user
       // res.send(user)
       if(user)
       next()
       else
       res,send('Not logged in')
        
    } catch (e) {
        res.send('Unable to authenticate')
        console.log(e)
    }
    
    
    
}
app.post('/users',async (req,res)=>{
    const user=new User(req.body)
   await user.save()
   try{
        const token=await user.getAuthToken()
        console.log('saved')
        res.send({user,token})
    }
    catch(e){
        console.log('error')
        res.status(400)
        res.send(e)
    }
    console.log(req.body)
    
})

app.post('/users/me/upload',auth,upload.single('avatar'),async (req,res)=>{
    req.user.avatar=req.file.buffer
   await req.user.save()
    res.send('image saved')
})


app.get('/users/:name/avatar',async (req,res)=>{
    const user=await User.findOne({name:req.params.name})
    if(!user||!user.avatar)
    return res.send('user not found')
    res.set('Content-Type','image/jpg')

    res.send(user.avatar)
})

app.get('/users/me',auth,async (req,res)=>{
   try {
        res.send(req.user)
    } catch(e){
        res.status(500)
        res.send('profile no')
    }
})


app.patch('/users/me',auth,async (req,res)=>{
    try{
        const user=await User.findOneAndUpdate({name:req.user.email},req.body,{new:true})
        //user.updateOne()
        if(!user)
        return res.send('user not found')
        return res.send(user)
    }
    catch(e){

        res.send(e)
    }
  
    // const res1=await user.updateMany()
        
  
})

app.post('/users/logout',auth,async (req,res)=>{
    req.user.tokens.token=req.user.tokens.token.filter((token)=>{
        return token.token!==req.token
    })
    await req.user.save()
    res.send('logged out succesfully')
})

app.post('/users/logoutall',auth,async (req,res)=>{
    try{req.user.tokens=[]
     await req.user.save()
    res.send('logged out succesfully')}
    catch(e)
    {
        console.log(e)
    }
})

app.patch('/tasks/:desc',async (req,res)=>{
    try{
        const task=await Task.findOneAndUpdate({description:req.params.desc},req.body)
        if(!task)
        return res.send('task not found')
        return res.send(task)
    }
    catch(e){

        res.send(e)
    }
  
    // const res1=await user.updateMany()
        
  
})




app.delete('/users/me',auth,async (req,res)=>{
    try{
       await req.user.remove()
       
        return res.send(req.user)
    }
    catch(e){

        res.send(e)
    }
  
    // const res1=await user.updateMany()
        
  
})

app.delete('/tasks/:desc',async (req,res)=>{
    try{
        const task=await Task.findOneAndRemove({description:req.params.desc})
        if(!task)
        return res.send('task not found')
        return res.send(task)
    }
    catch(e){

        res.send(e)
    }
  
    // const res1=await user.updateMany()
        
  
})








app.get('/tasks/:desc',(req,res)=>{
    Task.find({description:req.params.desc}).then((value)=>{
        res.send(value)
    }).catch((e)=>{
        res.status(500)
        res.send(res)
    })
})

app.post('/tasks',auth,(req,res)=>{
   
    const task=new Task(req.body)
    task.owner=req.user._id
    task.save().then(()=>{
        console.log('saved')
        res.send(task)
    }).catch((e)=>{
        console.log('error')
        res.status(400)
        res.send(e)
    })
    console.log(req.body)
    
})


app.post('/users/login',async (req,res)=>{

    try{
        const user=await User.findCred(req.body.email,req.body.password)
        const token=await user.getAuthToken()
        res.send(user)
        console.log(user,'done')
    }
    catch(e){
        res.status(400).send('Unable to login')
        console.log(e)
    }

})




app.listen(port,(error,res)=>{
    if(error)
    console.log('error')
    else
    console.log('listening on ',port)
})