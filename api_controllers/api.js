var mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');
const User=require('../model/user.model.js');
const dbInterface=require('../model/dbInterface').dbInterface;

class APIcontroller{

  constructor(app,db){
    this._app=app;
    this._DB=db;
    this.dbFunct=new dbInterface(db);
  }

  login(){
    var _app=this._app;
    var I=this;
    /*
     var params=[
      'username':Jack.
      'password':12345
       ];
    */
    _app.post('/auth/login', async function(req,res){
      //Find record in database by username
      //If user exists, check if password is valid or not
      //If code is valid, create JWT, return JWT toekn back to user
      //Other wise, error code will be returned
      res.send('login');
    });
  }
/*
 var params=[
     "first_name":'Jack',
     "last_name":'Xia',
     "username":'Jack31',
     "password":"123456789",
     "liked":[],
     "disliked":[],
     "liked_by":[]
   ];
 */
  register(){

    var _app=this._app;
    var I=this;
    _app.post('/auth/register',async (req,res)=>{
        var I=this.dbFunct;
      var result= await I.getUserObject(req.query.username);
      if(result == null){

     var pass=await bcryptjs.hashSync(req.query.password,8);
       const newUser=new User({
         first_name:req.query.first_name,
         last_name:req.query.last_name,
         username:req.query.username,
         password:pass,
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
  }
};

module.exports={
  APIinit:function(app,db){
    var API=new APIcontroller(app,db);
    API.init();
  }
};
