var http = require('http');
var qs = require('querystring');


var server = http.createServer ( function(request,response){
/*
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
    */
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1000000)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);
            console.log(post.say);
            console.log(post.to);
            request.connection.close();
        });
    }
});
server.listen(process.env.PORT || 5000);