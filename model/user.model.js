const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=Schema(
  {
    first_name:String,
    last_name:String,
    username:String,
    email:String,
    password:String,
    liked:Array,
    disliked:Array,
    liked_by:Array
  }
);
module.exports=mongoose.model('User',UserSchema);
