// const mongodb = require ('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
// caling the api and destractruing 

const  { MongoClient,ObjectID } = require ('mongodb')

const connectionURL= 'mongodb://127.0.0.1:27017'
const databaseName='task-manger'
const id = new ObjectID('5d88cd59ff0da53bcc0f1582')


MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{

    if (error){
        return console.log('enable to connect the databse')
    }
 const db= client.db(databaseName)


db.collection('task').deleteOne({
    _id:id
}).then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
})

})

