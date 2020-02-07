        
        
        // run mongodb server in the powershell 

      //  /Users/albal/mongodb/bin/mongod.exe --dbpath=/Users/albal/mongodb-data
        
        
        //  insert one record

   db.collection('users').insertOne({
       name:'mohammed',
       age:33
   },(err,result)=>{
      
    if(err){
        return console.log('unable to insert')
    }
    console.log(result.ops)
   })

        //   insert many record

db.collection('task').insertMany([
    {description:'clean the car',
    complated:true},
    {description:'bay new laptop',
    complated:false},
    {description:'go to the mall',
    complated:true}
],(err,result)=>{
    if (err){
        return console.log('unable to insert data ')
    }
    console.log(result.ops)
})

// searching records 

db.collection('task').find({complated:false}).toArray((err,task)=>{
    console.log(task)
})

//update many rcords 

db.collection('task').updateMany({
    complated:false

},{
    $set:{
    complated:true}
}).then((result)=>{
    console.log(result)
}).catch((err)=>{
    console.log(err)
})

// deleting an record 


db.collection('task').deleteOne({
    description:'clean the car'
}).then((res)=>{
    console.log(res)
    
}).catch((err)=>{
    console.log(err)
})



/// mongoose instence

//  create a instence for user and save
// const me = new User({
//     name:'mohammed',
//     age:'fghfg'
// })

// me.save().then(()=>{
//     me.console.log(me)
// }).catch((err)=>{
//     console.log(err)
// })