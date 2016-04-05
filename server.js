var http = require("http");

var server = http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('<h1>Hello World</h1>');
});
var port = Number(process.env.PORT || 3000)

server.listen(port);

// Console will print the message
