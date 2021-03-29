var http = require('http');
var qs = require('querystring');
const { MongoClient } = require("mongodb");
// This app uses Kaffeine to keep it alive http://kaffeine.herokuapp.com/
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://admin:memes123@cluster0.nlgqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);


var server = http.createServer ( function(request,response){
  //Used for Kaffeine
  if (request.method == 'GET') {
    response.writeHead(200, {"Content-Type": "application/json"});
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
            console.log(post.say);
            console.log(post.to);
            response.writeHead(200,{"Content-Type":"text\plain"});
            response.end("Say: " + post.say + " to: " + post.to);
            run(post.say).catch(console.dir);
        });
    }
});
server.listen(process.env.PORT || 5000);

async function run(data) {
  try {
    await client.connect();
    const database = client.db("P6");
    const gameData = database.collection("GameData");
    // create a document to be inserted
    // current timestamp in milliseconds
    let ts = Date.now();

    let date_ob = new Date(ts);
    let minute = date_ob.getMinutes;
    let hour = date_ob.getHours();
    let day = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    

    // prints date & time in YYYY-MM-DD format
    let date = year + "-" + month + "-" + day + "-" + hour + ":" + minute;

    const doc = { name: "Red", town: data, timeOfCollection: date};
    const result = await gameData.insertOne(doc);
    console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,);
  } finally {
    await client.close();
  }
}
