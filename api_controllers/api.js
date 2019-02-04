var mongoose=require('mongoose');

class APIcontroller{

  constructor(app,db){
    this._app=app;
    this._DB=db;
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
    _app.post('/login', function(req,res){
      //Parse req body, get pass word and user name
      // Find username, retrieve the password in hashed form
      // With the dehashed function? , compare the password and the hashed password
      //If password = okay, res.send('{okay:1,message:'Successfully login'}')
      // else
      // res.send('{okay:0,message Invalid login, }')
      res.send('login');
    });
  }
/*
 var params=[
    'new_username':Req.
    'new_password':1234,
   ];
 */
  register(){
    var _app=this._app;
    var I=this;
    _app.post('/register',(req,res)=>{
         //Check to see if username exists in database
         //If user exists, res.send('username exists', sorry!');
         // Hash the new_password
         // Passed hashed value and new username into the database
      res.send('register');
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
  }
};
