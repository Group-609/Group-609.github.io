var http = require('http');
var server = http.createServer ( function(request,response){

response.writeHead(200,{"Content-Type":"text\plain"});
if(request.method == "GET")
    {
        response.end("received GET request.")
    }
else if(request.method == "POST")
    {
        response.end("received POST request.");
        console.log("Memes");
    }
else
    {
        response.end("Undefined request .");
    }
});

 
server.listen(process.env.PORT || 5000);