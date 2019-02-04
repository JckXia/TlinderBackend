var MongoClient=require('mongodb').MongoClient;

var _db;
var MongoDBPort=process.env.MONGODB_URI || "mongodb://localhost:27017/Tlinder";

module.exports={
 connectPromise:function(cb){
   return new Promise(function(resolve, reject) {
     MongoClient.connect(MongoDBPort,{useNewUrlParser:true},(err,client)=>{
       if(err){

           console.log(err);
           reject(err);
           process.exit(1);
       }
         _db=client.db();
         console.log('Database connect up on port ',MongoDBPort);
           resolve(()=>{
             //Establish connectiont o Database
             console.log("Succeed!");
              return _db;
           });
     });
   });
 },
 getDb:function(){
   return _db;
 }
};
