var http = require('http');
var qs = require('querystring');
const { MongoClient } = require("mongodb");
// This app uses Kaffeine to keep it alive http://kaffeine.herokuapp.com/
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://admin:memes123@cluster0.nlgqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&keepAlive=1&connectTimeoutMS=30000";
const client = new MongoClient(uri);
client.connect();

var server = http.createServer ( function(request,response){
  if (request.method == 'GET') {
    console.log("Get request");
    request.on('data', function (data) {
      console.log("Get request data");
    });

    request.on('end', function () {
      console.log("Get request end");
      //getSessionConditionCounts().catch(console.dir);
      var controlCount = getControlConditionCount().catch(console.dir);
      var ddaCount = getDDAConditionCount().catch(console.dir);
      if(controlCount > ddaCount)
      {
        console.log("Sending response: DDA");
        response.end("DDA");
      }
      else
      {
        console.log("Sending response: Control");
        response.end("Control");
      }
      
    });
  }

  if (request.method == 'POST') {
    
    var body = '';

    request.on('data', function (data) {
        body += data;

        // Too much POST data, kill the connection!
        if (body.length > 10000000)
            request.connection.destroy();
    });

    request.on('end', function () {
        var post = qs.parse(body);
        //console.log(post.say);
        //console.log(post.to);
        response.writeHead(200,{"Content-Type":"text\plain"});
        response.end("Say: " + post.say + " to: " + post.to);
        run(post.to).catch(console.dir);
    });
  }
});
server.listen(process.env.PORT || 5000);

async function getSessionConditionCounts() {
  const database = client.db("P6");
  const gameData = database.collection("GameData");
  const withQuery = { condition: "DDA" };
  const withoutQuery = { condition: "Control" };
  const ddaCount= await gameData.countDocuments(withQuery);
  const controlCount = await gameData.countDocuments(withoutQuery);
  console.log(`Number of test sessions with the DDA condition: ${ddaCount}`);
  console.log(`Number of test sessions with the Control condition: ${controlCount}`);
}

async function getDDAConditionCount() {
  const database = client.db("P6");
  const gameData = database.collection("GameData");
  const query = { condition: "DDA" };
  const count= await gameData.countDocuments(query);
  console.log(`Number of test sessions with the DDA condition: ${count}`);
  return count;
}

async function getControlConditionCount() {
  const database = client.db("P6");
  const gameData = database.collection("GameData");
  const query = { condition: "Control" };
  const count = await gameData.countDocuments(query);
  console.log(`Number of test sessions with the DDA condition: ${count}`);
  return count;
}

async function run(data) {
  try {
    const database = client.db("P6");
    const gameData = database.collection("GameData");
    // create a document to be inserted
    // current timestamp in milliseconds
    let ts = Date.now();

    let date_ob = new Date(ts);
    let minute = date_ob.getMinutes();
    let hour = date_ob.getHours();
    let day = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    
    // prints date & time in YYYY-MM-DD format
    let date = year + "-" + month + "-" + day + "-" + hour + ":" + minute;
    var JsonData = JSON.parse(data);
    //console.log(JsonData);
    // create a query for a movie to update
    const query = { "sessionStartTime": JsonData.sessionStartTime };
    const options = {
      // create a document if no documents match the query
      upsert: true,
    };
    const result = await gameData.replaceOne(query, JsonData, options);
    //const result = await gameData.insertOne(JsonData);
    if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      console.log("No changes made to the collection.");
    } else {
      if (result.matchedCount === 1) {
        console.log("Matched " + result.matchedCount + " documents.");
      }
      if (result.modifiedCount === 1) {
        console.log("Updated one document.");
      }
      if (result.upsertedCount === 1) {
        console.log("Inserted one new document with an _id of " + result.upsertedId._id);
      }
    }
  } finally {
    console.log('Tried to insert data');
  }
}