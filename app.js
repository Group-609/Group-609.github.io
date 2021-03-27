var http = require('http');
var qs = require('querystring');


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
            request.connection.destroy();
        });
    }
});
server.listen(process.env.PORT || 5000);