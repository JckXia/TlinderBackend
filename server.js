
var Server=require('./utill/serverConnect.js');
var MongoServer=require('./utill/mongoConnect.js');
var APIroute=require('./api_controllers/api.js');

async function init(){
  var Serv=await Server.connectToServer();
  console.log('Server up!');
  var Datab=await MongoServer.connectPromise();
  console.log('We done!');
  var APP=Server.GetServer();
  var DB=MongoServer.getDb();
}

init().then(()=>{
  var APP=Server.GetServer();
  var DB=MongoServer.getDb();
   APIroute.APIinit(APP,DB); 
  console.log('Start API routes');
});
