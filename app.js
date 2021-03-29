var http = require('http');
var qs = require('querystring');
const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://admin:memes123@cluster0.nlgqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);


var server = http.createServer ( function(request,response){
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
            //request.connection.destroy();
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
    const doc = { name: "Red", town: data};
    const result = await gameData.insertOne(doc);
    console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,);
  } finally {
    await client.close();
  }
}
