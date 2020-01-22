const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient
const connectionUrl='mongodb://127.0.0.1:27017'
const dbName='taskmanager'
MongoClient.connect(connectionUrl,{useUnifiedTopology:true,useNewUrlParser:true},(error,client)=>{
    if(error)
     return console.log('Unable to connect')
                                                                    
     const db=client.db(dbName)
   const prom=  db.collection('task').deleteMany({age:29})                                          // {
                                                                    //     
     prom.then((result)=>{
         console.log(result)
     }).catch((error)=>{
         console.log(error)

     })                                                               //     db.collection('users').insertOne({
                                                                    //         name:"Utsav",
                                                                    //         age:20
                                                                    //     })
                                                                    // }
                                                                                                                // {
                                                    
                                                //     db.collection('task').insertMany([{
                                                //         name:"Utsav",
                                                //         age:20
                                                //     },{
                                                //         name:"Uts",
                                                //         age:26
                                                //     },{
                                                //         name:"av",
                                                //         age:29
                                                //     }],(error,result)=>{
                                                //         if(error)
                                                //         console.log('Unable to connect2')
                                                //         else
                                                //         {
                                                //             console.log(result.ops)
                                                //            // console.log(db.collection('users').find({}).on)

                                                //         }
                                                //     })
                                                // }
})