const User=require('./user.model.js');
class dbInterface{
  constructor(db){
    this.db=db;
  }
  //get a user object back by name

  getUserObject(userName){
    var db=this.db;
    return new Promise(function(resolve, reject) {
        db.collection('Users').findOne({
          username:userName
        },(err,result)=>{
            if(err){
              reject(err);
              return;
            }
            resolve(result);
        });
    });
  }
  //Post a user to the database
  insertUserObject(userObj){

      var db=this.db;
      return new Promise(function(resolve, reject) {
         db.collection('Users').insertOne(userObj,(err,result)=>{
           if(err){
             reject(err);
             return;
           }
           resolve(result);
         });
      });
  }

};
module.exports.dbInterface=dbInterface;
