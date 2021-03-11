
const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://admin:memes123@cluster0.nlgqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run(message) {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    // create a document to be inserted
    const doc = message;
    const result = await movies.insertOne(doc);
    console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

function insertData(message)
{
  window.alert("Inserting data into database");  
  //Run script from backend - we cannot just run The run(message) here because this file is hosted in github and we need to send a request or sth to the backend website
  run(message);
}

function addToGlobalScope()
{
  window.insertData = insertData;
  window.alert("Added test to global scope");    
}

