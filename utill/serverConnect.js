var express=require("express");
var bodyParser=require("body-parser");
var mongodb=require("mongodb");

var app=express();

var Port=process.env.PORT||8080;

module.exports={
connectToServer:function(){app.listen(Port,()=>{
   console.log("App running on port",Port);

})},
Gets:function(){
  app.get('/',function(req,res){
    res.send('Hello world');
  })
},
GetServer:function(){
  return app;
}
}
