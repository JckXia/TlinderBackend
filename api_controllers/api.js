var mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');

const jwt=require('jsonwebtoken');
const User=require('../model/user.model.js');
const dbInterface=require('../model/dbInterface').dbInterface;

class APIcontroller{

  constructor(app,db){
    this._app=app;
    this._DB=db;
    this.dbFunct=new dbInterface(db);
  }

  login(){
    //Step 1: Find record in database by username
    //Step2 :If user exists, check if password is valid or not
    //If code is valid, create JWT, return JWT toekn back to user
    //Other wise, error code will be returned
    var _app=this._app;
    var I=this;
    _app.post('/auth/login', async function(req,res){
      var userName=req.query.username;
      var userObject=await I.dbFunct.getUserObject(userName);
     if(userObject == null){
       res.send('{ok:0.message:`User does not exist`}');
       return;
     }
     var userPassword=userObject.password;
     if(bcryptjs.compareSync(req.query.password,userPassword)){

       var token=jwt.sign({username:req.query.username},'secret',{
         expiresIn:86400
       });
       res.status(200).send({auth: true,accessToken:token});
     }else{
     res.send('{ok:0,message:`Login failed!`}');
   }
    });
  }
  
  getData(){
    var _app=this._app;
    var I=this;
    _app.post('/auth/user',(req,res)=>{

       jwt.verify(req.query.token,'secret',{username:req.query.username},(err,decoded)=>{
          if(err){
            throw err;
          }
          res.send(decoded);
       });
       //res.send(decoded);
    });
  }

  register(){

    var _app=this._app;
    var I=this;
    _app.post('/auth/register',async (req,res)=>{
        var I=this.dbFunct;
      var result= await I.getUserObject(req.query.username);
      if(result == null){
       const newUser=new User({
         first_name:req.query.first_name,
         last_name:req.query.last_name,
         username:req.query.username,
         password:bcryptjs.hashSync(req.query.password,8),
         liked:[],
         disliked:[],
         liked_by:[]
       });
      var addResult=await I.insertUserObject(newUser);
      console.log(addResult);
       res.send(addResult);
     }else{
       res.send('{ok:0,message:`422: User exists`}')
     }
    });
  }
  init(){
    this.login();
    this.register();
    this.getData();
  }
};

module.exports={
  APIinit:function(app,db){
    var API=new APIcontroller(app,db);
    API.init();
  }
};
